import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Home = () => {
  return (
    <div className='home-back'>
      <img className='image' src='connect.jpg' alt='people connecting' />
      <FontAwesomeIcon icon={faFacebook} />
      <FontAwesomeIcon icon={faGoogle} />
    </div>
  );
};

export default Home;
