import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import LocalCodePage from './pages/LocalCodePage';


function App() {

  return (
    <Router>
      <>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={SignupPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/local_code' component={LocalCodePage} />
        
      </>
    </Router>

  );
}

export default App;