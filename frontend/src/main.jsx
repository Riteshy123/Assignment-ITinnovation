import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import NavigationBar from './components/Navbar';

ReactDOM.render(
  <Router>
    <NavigationBar />
    <App />
  </Router>,
  document.getElementById('root')
);
