import { WebApp } from 'meteor/webapp';
import { Meteor } from 'meteor/meteor';
import Agenda from 'agenda';
import Agendash from 'agendash';
import express from 'express';

const app = express();

const { createLogger, transports, format } = require('winston');

const { combine, timestamp, label, printf } = format;

const loggerFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(label({ label: 'server/agenda' }), timestamp(), loggerFormat),
  transports: [new transports.Console()],
});

let agenda;
if (process.env.NODE_ENV !== 'production') {
  agenda = new Agenda({ db: { address: 'mongodb://127.0.0.1:3001/meteor' } });
} else {
  agenda = new Agenda({ db: { address: process.env.MONGO_URL } });
}

agenda.define('log_something', (job) => {
  console.log('running job!');
});

(async function () {
  await agenda.start();
  // await agenda.every('1 minute', 'log_something');
  logger.info('agenda started...');
}());

app.use('/dash',
  function (req, res, next) {
    if (req.originalUrl === '/dash' || req.originalUrl === '/dash/') {
      res.sendStatus(401);
    }
    if (req.originalUrl.includes('/dash/?userId=')) {
      if (req.query.userId) {
        const user = Meteor.users.findOne(req.query.userId);
        if (user && user.admin) {
          next();
        } else {
          res.sendStatus(401);
        }
      } else {
        res.sendStatus(401);
      }
    } else {
      next();
    }
  },
  Agendash(agenda, { middleware: 'express' })
);

WebApp.connectHandlers.use(app);
