// if (typeof window !== 'undefined') {
//   require('jquery');
//   // require('popper.js');
//   // require('bootstrap');
//   // require('bootstrap/dist/css/bootstrap.min.css');
//   require('bootstrap/dist/js/bootstrap.min.js');
// }

import React from 'react';
import { hydrate } from 'react-dom';

import App from './components/App';
// import './index.scss';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';

const rootElement = document.getElementById('root');

const index = hydrate(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement,
);

export default index;
