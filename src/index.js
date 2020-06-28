import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './dashboard'
import './css/index.css'
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
  <Route path = "/admin" component = {Dashboard}/>
  </Router>
  ,document.getElementById('root')
);

