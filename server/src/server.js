const express = require('express');
const cors = require('cors');
const { resolve } = require('node:path');

function setupServer() {
  const app = express();
  const ORIGIN_URL = process.env.VITE_ORIGIN_API_URL;
  app.use(
    cors({
      origin: ORIGIN_URL || '*', // ORIGIN_URL が設定されていなければすべてのオリジンを許可
    })
  );
  app.use(express.json());
  app.use('/', express.static(resolve(__dirname, '../dist')));


  return app;
}

const app = setupServer();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Web server is running  PORT:${PORT}/`);
});
