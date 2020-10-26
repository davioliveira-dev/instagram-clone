import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.svg';
import camera from '../../assets/camera.svg';
import {HeaderContent, MainHeader} from './styles';

export default function Header() {
  return (
    <MainHeader>
      <HeaderContent>
        <Link to="/">
          <img src={logo} alt="Instagram Logo"/>
        </Link>
        <Link to="/new-post">
          <img src={camera} alt="Enviar Publicação"/>
        </Link>
      </HeaderContent>
    </MainHeader>
  );
}
