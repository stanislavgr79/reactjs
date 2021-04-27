import React from 'react';
import { render, hydrate } from 'react-dom';

import App from './components/App';
import './index.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const rootElement = document.getElementById('root');

hydrate(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement,
);
