import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './dashboard'
import './css/index.css'


ReactDOM.render(
  <React.StrictMode>
   <Dashboard />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
