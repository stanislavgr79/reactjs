import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../../src/components/App';

module.exports = function serverRenderer({ clientStats, serverStats }) {
  return (req, res) => {
    res.status(200).send(`
          <!doctype html>
          <html>
            <head>
              <meta charset=utf-8>
              <title>React server side rendering</title>
            </head>
            <body>
                <div id="root">${renderToString(React.createElement(App))}</div>
                <script src="/client.js"></script>
            </body>
          </html>
      `);
  };
};
