/* eslint-disable no-console */
'use strict';

const http = require('http');

function createServer() {
  /* Write your code here */
  // Return instance of http.Server class
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname.slice(1).split('/');

    const searchParams = url.searchParams;

    if (req.url.includes('..')) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Invalid path');

      return;
    }

    if (pathname.includes('//')) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');

      return;
    }

    if (pathname.length > 0 || searchParams.size > 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          parts: pathname,
          query: Object.fromEntries(searchParams),
        }),
      );
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
}

module.exports = {
  createServer,
};
