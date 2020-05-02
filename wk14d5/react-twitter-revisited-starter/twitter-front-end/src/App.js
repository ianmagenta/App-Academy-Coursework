import React from 'react';
import RegistrationForm from './components/session/RegistrationForm';
import { Switch, Route, NavLink } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from './components/session/LoginForm';
import Profile from './components/Profile';
import { ProtectedRoute, AuthRoute } from './Routes';

const App = () => (
  <div>
    <h1>Twitter Lite</h1>
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>

    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <AuthRoute path='/register' component={RegistrationForm} />
      <AuthRoute path='/login' component={LoginForm} />
      <ProtectedRoute path='/users/:userId' component={Profile} />
    </Switch>
  </div>
);

export default App;
