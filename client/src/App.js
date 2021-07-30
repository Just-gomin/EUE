import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import EditPage from './pages/EditPage';
import PrivateRoute from './utils/PrivateRoutes';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';
import { checkCookies } from './utils/CheckDB';


function App() {
  useEffect(() => {
    localStorage.setItem('login', false)
  }, [checkCookies()])

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/login' component={LoginPage} />

        <PrivateRoute path='/edit'>
          <EditPage />
        </PrivateRoute>

        <Route component={PageNotFound} />
      </Switch>

      <Footer />
    </Router>

  );
}

export default App;