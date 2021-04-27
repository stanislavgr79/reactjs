import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './components/App';

function renderHTML(html) {
  return `
    <!doctype html>
    <html>
        <head>
            <meta charset=utf-8>
            <title>React server side rendering</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script src="/js/main.js"></script>
        </body>
    </html>
    `;
}

export default function serverRenderer() {
  return (req, res) => {
    const htmlString = renderToString(<App />);
    res.status(200).send(renderHTML(htmlString));
  };
}
