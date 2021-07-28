import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import LocalCodePage from './pages/LocalCodePage';
import PrivateRoute from './utils/PrivateRoutes';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';


function App() {

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/loc' component={LocalCodePage} />

        <PrivateRoute path='/local_code'>
          <LocalCodePage />
        </PrivateRoute>

        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </Router>

  );
}

export default App;