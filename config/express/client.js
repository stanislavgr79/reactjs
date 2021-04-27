const React = require('react');
const ReactDOM = require('react-dom');
const App = require('../../src/components/App/App.tsx');

import './index.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

ReactDOM.render(React.createElement(App), document.getElementById('root'));
