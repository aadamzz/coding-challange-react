import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../context/Context';
import styled from 'styled-components';

const Section = styled.section`
    width: 100%;
    height: 140px;
    display: grid;
    align-items: center;
	grid-template-columns: repeat(2, 1fr);

	@media (max-width: 720px) {
		grid-template-rows: repeat(2, 1fr);
		margin: 20px 0;
	}
`;


const InputsForm = styled.form`
    display: flex;
    align-items: center;
    width: 70%;  
    height: 100%;
    justify-content: flex-start;
    margin-left: 50px;
    position: relative;
	grid-column: 1 / 2;

	@media (max-width: 720px) {
		grid-row: 1 / 2;
	}
`;

const Input = styled.input`
	border: none;
	height: 43px;
    padding: 12px;
    width: 400px;
    background-color: ${({ theme: { darkMode: { elementsColor } } }) => elementsColor};
    border-radius: 5px;
    color: ${({ theme: { darkMode: { textColor } } }) => textColor};
    font-size: 15px;
    padding-left: 50px;

	::placeholder { 
		color: ${({ theme: { darkMode: { textColor } } }) => textColor};
	}
	@media (max-width: 400px) {
		width: 330px;
	}
`;

const InputsDropdownContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 91.5%;  
	height: 100%;
	grid-column: 2 / -1;

	@media (max-width: 720px) {
		grid-row: 2 / -1;  
		grid-column: 1 / 2;
		justify-content: flex-start;
		padding-left: 50px;
	}
`;

const SvgStyles = {
	position: "absolute",
	left: "15px"
};

const Select = styled.select`
	width: 200px;
	padding: 12px;
	background-color: ${({ theme: { darkMode: { elementsColor } } }) => elementsColor};
	border-radius: 5px;
	font-size: 15px;
	padding-right: 50px;
	border: none;
	color: ${({ theme: { darkMode: { textColor } } }) => textColor};
`;

function Form() {
	// zrobic custom hooka dla inputow, albo przynajmniej polaczyc to w jedno
	const { countries, setFilteredCountries } = useContext(Context);
	const [search, setSearch] = useState(() => '');
	const [filter, setFilter] = useState(() => '');

	//input filter
	useEffect(() => {
		setFilteredCountries(
			countries.filter(({ name }) => {
				return name.toLowerCase().includes(search.toLowerCase());
			})
		);
		return () => {
			setFilteredCountries(countries);
		};
	}, [countries, search]);

	// select filter
	useEffect(() => {
		if (filter === "") return;
		setFilteredCountries(
			countries.filter(({ region }) => {
				if (filter === 'All Regions') return countries;
				return region === filter;
			})
		);
		return () => {
			setFilteredCountries(countries);
		};
	}, [countries, filter]);

	return (
		<Section>
			<InputsForm>
				<svg style={SvgStyles} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" />
					<circle cx="10" cy="10" r="7" />
					<line x1="21" y1="21" x2="15" y2="15" />
				</svg>
				<Input type="text" name="region" value={search} onChange={e => setSearch(e.currentTarget.value)} placeholder="Search for a country..." />
			</InputsForm>
			<InputsDropdownContainer>
				<Select name="select" value={filter} onChange={e => setFilter(e.currentTarget.value)}>
					<option default>All Regions</option>
					<option>Africa</option>
					<option>Americas</option>
					<option>Asia</option>
					<option>Europe</option>
					<option>Oceania</option>
				</Select>
			</InputsDropdownContainer>
		</Section>
	);
};

export default Form;
