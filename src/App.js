import React, { useState, useContext } from 'react';
import Main from './components/Main';
import Details from './components/Details';
import { Context } from './context/Context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Variables } from './theme/Variables';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/main_components/Header';
import { ColorContext } from './context/ColorModeContext'
import { lightMode, darkMode } from './theme/Variables'

const Wrapper = styled.div`
    min-height: 100vh;
    background-color: ${({ theme: { backgroundColor } }) => backgroundColor};

    overflow: hidden;

    @media (max-width: 530px) {
      font-size: 15px;
    }
`;

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const { colorMode, setColorMode } = useContext(ColorContext)

  return (
    <Router>
      <ThemeProvider theme={colorMode === "dark" ? darkMode : lightMode}>
        <Header />
        <Switch>
          <Wrapper>
            <Context.Provider value={{ countries, setCountries, filteredCountries, setFilteredCountries }}>
              <Route exact path="/" component={Main} />
              <Route path="/:name" component={Details} />
            </Context.Provider>
          </Wrapper>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
