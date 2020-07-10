import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components';
import { Context } from '../../context/Context';
import Loader from '../Loader';
import { Link } from 'react-router-dom';

const Main = styled.main`
    padding: 0 50px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    justify-content: center;
    align-items: center;
    grid-gap: 25px;
	background-color: ${({ theme: { backgroundColor } }) => backgroundColor};
`;

const CountryTemplate = styled.section`
    max-height: 400px;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
	margin: 0 auto;
	max-width: 1000px;
	margin-bottom: 15px;

	@media(max-width: 720px) {
		margin-bottom: 15px;
	}
`;

const ImageWrapper = styled.div`
	width: 100%;
    height: 30%;
	display: flex;
	align-items: center;
	overflow: hidden;

    img {
        width: 100%;
        height: auto;
    }
`;

const CountryInfo = styled.div`
    height: 70%;
	background-color: ${({ theme: { elementsColor } }) => elementsColor};
	color: ${({ theme: { textColor } }) => textColor};    
	padding: 30px 20px;

    h3 {
        font-size: 18px;
		font-weight: 600;
    }
	p {
		padding-top: 10px;
		font-weight: 600;
		span {
			font-weight: 300;
		}
	}
`;

const linkStyles = {
	textDecoration: "none"
};

function Grid({ numberWithCommas }) {
	const { setCountries, filteredCountries } = useContext(Context);
	const [loader, setLoader] = useState(true);

	const fetchData = async () => {
		try {
			const response = await fetch("https://restcountries.eu/rest/v2/all");
			const json = await response.json();

			setCountries(json);
			setLoader(false);
		} catch (error) {
			console.log(error)
		}
	};

	useEffect(() => {
		fetchData();
	}, [])

	if (loader) return <Loader />;
	return (
		<Main>
			{
				filteredCountries.map(({ name, population, capital, region, flag }, index) => {
					return (
						<Link style={linkStyles} to={`/${name}`} key={index}>
							<CountryTemplate>
								<ImageWrapper>
									<img src={flag} alt="country flag" />
								</ImageWrapper>
								<CountryInfo>
									<h3>{name}</h3>
									<p>Population: <span>{numberWithCommas(population)}</span></p>
									<p>Region: <span>{region}</span></p>
									<p>Capital: <span>{capital}</span></p>
								</CountryInfo>
							</CountryTemplate>
						</Link>
					);
				})
			}
		</Main>
	);
};

export default Grid;
