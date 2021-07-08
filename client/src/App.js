import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Oauth from './components/Oauth';


function App() {
  
  return (
    <Router>
      <>
      <Route exact path='/' component={Home} />
      <Route path='/oauth' component={Oauth}/>
      </>
    </Router>
    
  );
}

export default App;