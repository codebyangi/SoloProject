import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.jpg';
import icon from '../../assets/icon.jpg';

export default function Header() {
  return (
    <header className='header'>
      <div className='logo-container'>
        <img src={logo} alt='Logo' className='logo' />
        <h1 className='title'>CodeByAngi</h1>
      </div>

      <div className='links-container'>
        <Link to='/patients' className='link'>Patients</Link>
        <img src={icon} alt='Icon' className='icon' />
      </div>
    </header>
  );
}
