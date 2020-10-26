import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Header from './components/Header';
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes />
    </BrowserRouter>
  );
}
