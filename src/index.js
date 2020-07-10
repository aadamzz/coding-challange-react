import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Reset from './theme/Reset';
import { ColorModeContext } from './context/ColorModeContext'

ReactDOM.render(
  <React.StrictMode>
    <ColorModeContext>
      <Reset />
      <App />
    </ColorModeContext>
  </React.StrictMode>,
  document.getElementById('root')
);
