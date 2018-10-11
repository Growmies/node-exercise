const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');

const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

module.exports = bunyan.createLogger({
  name: 'logs',
  src: true,
  streams: [
    {
      period: '1w',
      count: 3,
      // log debug and above to stdout
      level: 'debug',
      type: 'raw',
      stream: prettyStdOut,
    },
  ],
});