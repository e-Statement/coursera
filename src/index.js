import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import FilterProvider from './utils/store'

ReactDOM.render(
  <React.StrictMode>
      <FilterProvider>
            <App />
      </FilterProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
