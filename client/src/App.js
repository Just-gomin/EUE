import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import EditPage from './pages/EditPage';
import OnlyUser from './utils/OnlyUser';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';
import GetLocFirst from './pages/GetLocFirst';
import { isLogined } from './utils/Auth';


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
        {isLogined() ?
          <Route path='/signup' component={PageNotFound} />
          :
          <Route path='/signup' component={SignupPage} />
        }

        {isLogined() ?
          <Route path='/login' component={PageNotFound} />
          :
          <Route path='/login' component={LoginPage} />
        }
        <Route path='/first-local-code' component={GetLocFirst} />

        <OnlyUser path='/edit'>
          <EditPage />
        </OnlyUser>

        <Route component={PageNotFound} />
      </Switch>

      <Footer />
    </Router>

  );
}

export default App;