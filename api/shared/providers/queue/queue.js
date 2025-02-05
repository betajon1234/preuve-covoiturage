const Queue = require('bull');
const config = require('../../config');

module.exports = name => new Queue(`${process.env.NODE_ENV}-${name}`, { redis: config.redisUrl });
