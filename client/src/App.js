import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './navigation';
import Home from './pages/HomePage';
import SignUp from './pages/SignUpPage';
import SignIn from './pages/SignIn';

const App = () => {
  const token =
    (localStorage.getItem('token') &&
      JSON.parse(localStorage.getItem('token'))) ||
    [];
  const [newToken, setToken] = useState('');

  if (!token) {
    setToken('');
  }

  return (
    <Router>
      <Navigation token={newToken} />
      <Route exact path='/' component={Home} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/signin' component={SignIn} />
    </Router>
  );
};

export default App;
