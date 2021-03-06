import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Main = styled.main`
 	width: 100%;
  	height: 50vh;
  	display: flex;
  	align-items: center;
	justify-content: center;
	background-color: ${({ theme: { backgroundColor } }) => backgroundColor};

	@media (max-width: 880px) {
		height: 75vh;
	}
`;

const BackButtonContainer = styled.div`
	width: 100%;
	height: 130px;
	display: flex;
	align-items: center;
	position: relative;

	button {
		width: 110px;
		height: 41px;
		font-size: 15px;
		color: ${({ theme: { textColor } }) => textColor};
		margin-left: 50px;
		background-color: ${({ theme: { elementsColor } }) => elementsColor};
		border: none;
		border-radius: 5px;
		cursor: pointer;
		border: 3px solid #1e2b34;
		padding-left: 25px;
	}
`;

const svgStyles = {
	position: "absolute",
	top: "50%",
	bottom: "50%",
	transform: "translate(50%, -50%)",
	left: "55px"
};

const ContentWrapper = styled.section`
	width: 100%;
	height: 100%;
	padding: 0 50px;
	display: flex;

	@media (max-width: 880px) {
		flex-direction: column;
	}
`;

const FlagWrapper = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	overflow: hidden;

	img {
		width: 100%;
  		height: auto;
	}

	@media (max-width: 880px) {
		overflow: visible;
		width: 350px;
		height: 240px;
	};

	@media (max-width: 440px) {
		width: 250px;
		height: 175px;
	};
`;

const DetailsWrapper = styled.div`
	padding: 30px 30px 30px 70px;
	width: 50%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(4, 1fr);

	@media (max-width: 1070px) {
		width: 65%;	
	};

	@media (max-width: 940px) {
		width: 75%;
	}
	@media (max-width: 880px) {
		width: 85%;
		padding: 30px 0;

		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(6, 1fr);

		height: 500px;
	}

	@media (max-width: 350px) {
		height: 460px;
	}
`;

const AContainer = styled.ul`
	color: ${({ theme: { textColor } }) => textColor};
	grid-column: 1 / 3;
	grid-row: 1 / 4; 
	display: flex;
	flex-direction: column;

	@media (max-width: 880px) {
		grid-row: 1 / 3;
		grid-column: 1 / 2;
	};

	li {
		padding-bottom: 15px;
		font-weight: 600;

		h2 {
			padding-top: 24px;
			font-size: 20px;
			font-weight: 800;
		}
		h3 {
			font-weight: 600;
		}
		span {
			font-weight: 300;
		}
	}
`;

const BContainer = styled.ul`
	color: ${({ theme: { textColor } }) => textColor};
	grid-column: 3 / 5;
	grid-row: 1 / 4;
	display: flex;
	flex-direction: column;
	padding-top: 60px;

	@media (max-width: 880px) {
		grid-row: 4 / 5;
		grid-column: 1 / 2;
	};

	li { 
		padding-bottom: 10px;
		font-weight: 600;

		span {
			font-weight: 300;
		}
		ul {
			display: flex;
			li {
				padding-left: 10px;
				font-weight: 300;
			}
		}
	}
`;

const CContainer = styled.div`
	color: ${({ theme: { textColor } }) => textColor};
	grid-column: 1 / 5;
	grid-row: 4 / 5;
	
	display: flex;
	align-items: center;

	
	@media (max-width: 880px) {
		grid-row: 5 / 6;
		grid-column: 1 / 2;
		width: 80vw;
	};

	ul {
		display: flex;
		flex-wrap: wrap;
	}
`;

const BorderCountriesList = styled.li`
	width: 70px;
	height: 30px;
	background-color: ${({ theme: { elementsColor } }) => elementsColor};
	border-radius: 5px;
	display: flex;
    align-items: center;
    justify-content: center;
	margin: 5px 5px;

	@media(max-width: 420px) {
		margin: 2px 2px;
	}
`;

const numberWithCommas = x => {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function Details({ match }) {
	const [countryDetails, setCountryDetails] = useState({});
	const [loader, setLoader] = useState(true);
	const [borderCountries, setBorderCountries] = useState([]);

	const fetchData = async () => {
		try {
			const response = await fetch(`https://restcountries.eu/rest/v2/name/${match.params.name}`);
			const data = await response.json();
			setCountryDetails(data);
			setBorderCountries(data.map(element => element.borders))
			setLoader(false);
		} catch (error) {
			console.log(error)
		}
	};

	useEffect(() => {
		fetchData();
	}, [])


	if (loader) return <Loader />
	return (
		<>
			<BackButtonContainer>
				<Link to='/'>
					<svg style={svgStyles} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="hsl(0, 0%, 100%)" fill="none" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" />
						<line x1="5" y1="12" x2="19" y2="12" />
						<line x1="5" y1="12" x2="9" y2="16" />
						<line x1="5" y1="12" x2="9" y2="8" />
					</svg>
					<button>Back</button>
				</Link>
			</BackButtonContainer>
			<Main>
				<ContentWrapper>
					<FlagWrapper>
						{
							countryDetails.map(({ flag, name }, index) => {
								return <img key={index} src={flag} alt={name} />
							})
						}
					</FlagWrapper>
					<DetailsWrapper>
						{
							countryDetails.map(({ name, nativeName, population, region, subregion, capital }, index) => {
								return (
									<AContainer key={index}>
										<li><h2>{name}</h2></li>
										<li><h3>Native Name: {nativeName}</h3></li>
										<li>Population: <span>{numberWithCommas(population)}</span></li>
										<li>Region: <span>{region}</span></li>
										<li>Sub Region: <span>{subregion}</span></li>
										<li>Capital: <span>{capital}</span></li>
									</AContainer>
								);
							})
						}
						{
							countryDetails.map(({ alpha2Code, currencies, languages }, index) => {
								return (
									<BContainer key={index}>
										<li>Top Level Domain: <span>{alpha2Code}</span></li>
										<li>Currencies: <span>{currencies[0].name}</span></li>
										<li>
											<ul>Languages:
 												{
													languages.map(({ name }, index) => {
														return <li key={index}>{name} </li>
													})
												}
											</ul>
										</li>
									</BContainer>
								);
							})
						}
						<CContainer>
							<span>Border Countries:</span>
							<ul>
								{
									countryDetails.map(element => element.borders)[0].map(element => (
										<BorderCountriesList>{element}</BorderCountriesList>
									))
								}
							</ul>
						</CContainer>
					</DetailsWrapper>
				</ContentWrapper>
			</Main>
		</>
	);
};

export default Details;