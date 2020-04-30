import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Rainbow from './components/Rainbow';
import { BrowserRouter } from 'react-router-dom';

const Root = () => (
  <BrowserRouter>
    <Rainbow />
  </BrowserRouter>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root />,
    document.getElementById('root'),
  );
});
