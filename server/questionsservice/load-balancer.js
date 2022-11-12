const express = require('express');
const axios = require('axios');

const loadBalancer = express();

const servers = [
  'http://44.202.110.253:3002',
];

let current = 0;

const handler = async (req, res) => {
  const { method, url, headers, body } = req;
  const server = servers[current];
  //round robin
  current = current === servers.length - 1 ? 0 : current++;
  try {
    const response = await axios({
      url: `${server}${url}`,
      method,
      headers,
      data: body,
    });
    res.send(response.data);
  } catch (err) {
    res.status(500).send("Server error!");
  }
};

//Logger
loadBalancer.use('/', (req, res, next) => {
  console.log(`${req.method} REQUEST ON ${req.url}`);
  next();
});

loadBalancer.use((req, res) => {
  handler(req, res);
});

//Loader.io verification
const { LOADER } = process.env;
loadBalancer.get('/loaderio-09e8a0ef5159f48e231afcabf891bd88', (req, res) => {
  res.send(LOADER);
});

const port = 8080;

loadBalancer.listen(port, () => {
  console.log(`Load Balancer listening on ${port}`);
});
