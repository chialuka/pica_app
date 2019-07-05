import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './navigation';
import Home from './pages/HomePage';
import SignUp from './pages/SignUpPage';

const App = () => {
  const token = (localStorage.getItem('token') && JSON.parse(localStorage.getItem('token'))) || [];
  const [newToken, setToken] = useState('');

  if (!token) {
    setToken('')
  }

  return (
    <Router>
      <div>
        <Navigation token={newToken} />
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={SignUp} />
      </div>
    </Router>
  )
}

export default App;
