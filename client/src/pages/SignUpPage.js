import React, { useState } from 'react';
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: ''
  });

  const handleChange = e => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const createUser = async props => {
    try {
      const newUser = await axios.post('/users/signup', userDetails);
      console.log(newUser, 'newUser');
      if (newUser.status !== 201) {
        return newUser.body.error;
      }
      props.history.push('/dashboard')
    } catch (error) {
      return error;
    }
  }

  const { fullName, userName, email, password } = userDetails;
  return (
    <Paper>
      Let's get to know you!
      <TextField
        required
        label="Full Name"
        name="fullName"
        value={fullName}
        onChange={handleChange}
      />
      <TextField
        required
        label="Username"
        name="userName"
        value={userName}
        onChange={handleChange}
      />
      <TextField
        required
        type='email'
        label="Email address"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <TextField
        required
        type='password'
        label="Password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={createUser} style={{ margin: 15 }}>
        Sign Up
      </Button>
      <div>Have an account?<Link to='/signin'>Login here</Link></div>
    </Paper>
  );
};

export default withRouter(SignUp);
