import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
    <Paper>
      Let's get you logged in!
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
      <div>
        Don't have an account?<Link to="/signup">Sign up here</Link>
      </div>
    </Paper>
  );
};

export default withRouter(SignIn);
