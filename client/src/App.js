import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Oauth from './utils/Oauth';
import SignupPage from './pages/SignupPage';


function App() {

  return (
    <Router>
      <>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={SignupPage} />
        <Route path='/oauth' component={Oauth} />
      </>
    </Router>

  );
}

export default App;