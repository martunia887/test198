// @flow

require('@babel/polyfill');

import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import express from 'express';
import React from 'react';
import reactDOM from 'react-dom/server';
import App from './components/App.js';

const app = express();
const sheet = new ServerStyleSheet();
//require('./utils/renderExamplesToString');

app.use(express.static('./'));

app.get('/', (req, res) => {
  //console.log(reactDOM.renderToString(<App />));
  const html1 = reactDOM.renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <App />
    </StyleSheetManager>,
  );
  const styleTags = sheet.getStyleTags();

  const HTML = html(html1, styleTags);
  //console.log(HTML);
  res.send(HTML);
});

app.listen(8080, () => {
  console.log('app started at 8080');
});

const html = (text, styleTags) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    ${styleTags}
</head>
<body>
<div id="root">${text}</div>
<script src="/dist/client.js"></script>
</body>
</html>
`;
