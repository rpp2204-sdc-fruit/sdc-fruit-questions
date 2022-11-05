const { createClient } = require('redis');

const redisClient = createClient();
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
