if (typeof window !== 'undefined') {
  require('jquery');
  require('bootstrap/dist/js/bootstrap.min.js');
}

import React from 'react';
import { hydrate } from 'react-dom';
import App from './src/components/App';

// import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

hydrate(<App />, document.getElementById('root'));
