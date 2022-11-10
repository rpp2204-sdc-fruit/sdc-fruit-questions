const { createClient } = require('redis');
require('dotenv').config();

const { REDISPW } = process.env;

const redisClient = createClient(`redis://sdcuser:${REDISPW}@172.31.94.95:6379`);
redisClient.connect();

redisClient.on('error', (err) => {
  console.log(err);
});
redisClient.on('ready', () => {
  console.log('Redis client connected!');
});
redisClient.on('end', () => {
  console.log('Redis client disconnected!');
});

module.exports.redisClient = redisClient;
