import React, { useState, createContext } from 'react';
import Main from './components/Main';
import Details from './components/Details';
import { Context } from './context/Context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Variables } from './theme/Variables';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/main_components/Header';


// tutaj cos mozna pokombinowac z tym min-heightem, zeby w details nie pokazywal sie scroll
const Wrapper = styled.div`
    min-height: 100vh;
    background-color: ${props => props.theme.darkMode.backgroundColor};
    overflow: hidden;

    @media (max-width: 530px) {
      font-size: 13px;
    }
`;

function App() {
  // const [darkMode, setDarkMode] = useState(true);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  return (
    <Router>
      <ThemeProvider theme={Variables}>
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
