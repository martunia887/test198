// @flow

import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

const express = require('express');
const React = require('react');
const reactDOM = require('react-dom/server');
const Button = require('@atlaskit/button').default;

const sheet = new ServerStyleSheet();
const app = express();

app.use(express.static('./'));

app.get('/', (req, res) => {
  console.log(reactDOM.renderToString(<div>{<Button>Test</Button>}</div>));
  const html1 = reactDOM.renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <Button>Test</Button>
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
<script src="/client.js"></script>
</body>
</html>
`;
