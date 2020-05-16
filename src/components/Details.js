import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Main = styled.main`
 	width: 100%;
  	height: 45vh;
  	display: flex;
  	align-items: center;
	justify-content: center;
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
		color: ${({ theme: { darkMode: { textColor } } }) => textColor};
		margin-left: 50px;
		background-color: ${({ theme: { darkMode: { elementsColor } } }) => elementsColor};
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
`;

const FlagWrapper = styled.div`
	width: 45%;
	height: 100%;
	display: flex;
	align-items: center;
	border: 1px solid white;

	img {
		width: 100%;
  		height: auto;
 
		/* height: 100%; */
	}
`;

//h100% - alternatywa przy rwd powinno wyjsc 

const DetailsWrapper = styled.div`
	width: 60%;
	height: 100%;
	border: 1px dotted white;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(4, 1fr);
`;

const AContainer = styled.div`

`;

const BContainer = styled.div`

`;

const CContainer = styled.ul`

`;


function Details({ match }) {

	const [countryDetails, setCountryDetails] = useState({});
	const [loader, setLoader] = useState(true);

	const fetchData = async () => {
		try {
			const response = await fetch(`https://restcountries.eu/rest/v2/name/${match.params.name}`);
			const data = await response.json();

			setCountryDetails(data);
			setLoader(false)
			console.log(data);
		} catch (error) {
			console.log(error)
		}
	};

	useEffect(() => {
		fetchData();
	}, [])

	//tutaj mozna sie zastanowic czy Main ma byc wrapperem dla wszystkiego wlaczajac button czy button ma nie wchodzic w tresc Main

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
					{
						countryDetails.map(({ flag, name }) => {
							return <FlagWrapper>
								<img src={flag} alt={name} />
							</FlagWrapper>
						})
					}
					{
						countryDetails.map(({ nativeName, population, region, subregion, capital, alpha2Code, currencies, languages, borders }, index) => {
							return <DetailsWrapper style={{ color: "white" }} key={index}>
								<h2>Native name: {nativeName}</h2>
								<p>Population: {population}</p>
								<p>Region: {region}</p>
								<p>Sub Region: {subregion}</p>
								<p>Capital: {capital}</p>
								<BContainer>
									<strong>Top Level Domain: {alpha2Code}</strong>
									<p>Currencies: {currencies[0].name}</p>
									<ul style={{ display: "flex", border: '1px solid white' }}>Languages:
									{
											languages.map(({ name }, index) => {
												return <li key={index}>{name}</li>
											})
										}
									</ul>
								</BContainer>
								<CContainer>
									{
										borders.map((element, index) => {
											return <li key={index}>{element}</li>
										})
									}
								</CContainer>
							</DetailsWrapper>
						})
					}
				</ContentWrapper>
			</Main>
		</>
	);
};

export default Details;
