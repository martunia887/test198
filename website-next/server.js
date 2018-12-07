const express = require('express');
const next = require('next');
const path = require('path');
const bolt = require('bolt');
const getSomeContents = require('./scratchings');

const folder = process.argv[2];
if (!folder) {
  console.error(
    'You need to pass in a path to a folder which you wish to run.',
  );
  return;
}

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
app
  .prepare()
  .then(() => bolt.getProject({ cwd: process.cwd() }))
  .then(({ dir }) => {
    const server = express();

    const folderPath = path.resolve(dir, folder);
    const pageInfo = getSomeContents(folderPath);

    server.get('/example/:id', (req, res) => {
      const actualPage = '/post';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
