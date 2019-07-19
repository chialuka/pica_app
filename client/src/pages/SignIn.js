import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

dotenv.config();

const { REACT_APP_BACKEND_URL } = process.env;

const SignIn = () => {
  const [loginDetails, setLoginDetails] = useState({
    userDetails: '',
    password: ''
  });

  const handleChange = e => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value
    });
  };

  const loginUser = async props => {
    try {
      const login = await axios.post('/users/login', loginDetails);
      if (login.status !== 200) {
        return login.body.error;
      }
      props.history.push('/dashboard');
    } catch (error) {
      return error;
    }
  };

  const { userDetails, password } = loginDetails;

  return (
    <Paper elevation={3} className="paper">
      <p className="head-title">Let's get you logged in!</p>
      <TextField
        required
        label="Username or email"
        name="userDetails"
        value={userDetails}
        onChange={handleChange}
      />
      <TextField
        required
        type="password"
        label="Password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={loginUser} style={{ margin: 15 }}>
        Login
      </Button>
      <div className="head-title">
        Don't have an account?<Link to="/signup"> Sign up here</Link>
      </div>
      <div className='social-buttons'>
        Login with {' '}
        <span>
          <a href={`${REACT_APP_BACKEND_URL}/auth/facebook`}>
          <FontAwesomeIcon icon={faFacebook} className='social-logo'/>
          </a>
        </span>{' '}
        <span>
        <a href={`${REACT_APP_BACKEND_URL}/auth/google`}>
        <FontAwesomeIcon icon={faGoogle} className='social-logo'/>
        </a>
        </span>
      </div>
    </Paper>
  );
};

export default withRouter(SignIn);
