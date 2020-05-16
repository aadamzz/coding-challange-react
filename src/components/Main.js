import React from 'react';
import Form from './main_components/Form';
import Grid from './main_components/Grid';
// import { Context } from '../context/Context';
// import { Link } from 'react-router-dom';

const numberWithCommas = x => {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function Main() {
	// const { darkMode, setDarkMode } = useContext(Context);

	return (
		<>
			<Form />
			<Grid numberWithCommas={numberWithCommas} />
		</>
	);
};

export default Main;
