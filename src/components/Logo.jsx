import React, { Component } from 'react';
import logo from '../images/logo.png';
import '../styles/Logo.css';

class Logo extends Component {
  render() {
    return (
      <div className='container'>
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Music Tunes</h1>
        <img src={logo} alt="Logo" className="logo" />
      </div>
    );
  }
}

export default Logo;
