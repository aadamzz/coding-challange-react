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
    grid-gap: 20px;
    background-color: ${props => props.theme.darkMode.backgroundColor};
`;

const CountryTemplate = styled.section`
    max-height: 400px;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
`;

const ImageWrapper = styled.div`
    max-height: 30%;

    img {
        width: 100%;
        height: auto;
    }
`;

const CountryInfo = styled.div`
    max-height: 70%;
    background-color: ${({ theme: { darkMode: { elementsColor } } }) => elementsColor};

    color: ${({ theme: { darkMode: { textColor } } }) => textColor};
    

    h3 {
        font-size: 18px;
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
									<p>Population: {numberWithCommas(population)}</p>
									<strong>Region: {region}</strong>
									<strong>Capital: {capital}</strong>
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

//jutro: 
// poprawic grida i wyglad strony
// filtrowanie przez nazwy regionow


//  <CountryTemplate>
//     <ImageWrapper>
//         {/* <img src="http://placekitten.com/200/300" alt="country flag" /> */}
//     </ImageWrapper>
//     <CountryInfo>
//         <h3>Germany</h3>
//         <p>Population: 81,770,900</p>
//         <strong>Region: Europe</strong>
//         <strong>Capital: Berlin</strong>
//     </CountryInfo>
// </CountryTemplate> 