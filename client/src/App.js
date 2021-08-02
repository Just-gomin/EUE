import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import EditPage from './pages/EditPage';
import PrivateRoute from './utils/PrivateRoutes';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';
import GetLocFirst from './pages/GetLocFirst';


function App() {
  
  const isLs = localStorage.getItem('login')

  function loginDefault() {
    if (isLs === null) {
      localStorage.setItem('login', false)
    }
  }

  return (
    <Router>
      {loginDefault()}
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/first-local-code' component={GetLocFirst} />

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