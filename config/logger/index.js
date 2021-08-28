const morgan = require('morgan');
const chalk = require('chalk');

module.exports = morgan(function(tokens,req,res){
    return [
        chalk.green.bold(tokens.method(req, res)),
        chalk.red.bold(tokens.status(req, res)),
        chalk.cyan(tokens.url(req, res)),
        chalk.yellow(tokens['response-time'](req, res) + ' ms'),
    ].join(' ');
})
