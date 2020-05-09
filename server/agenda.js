import { WebApp } from 'meteor/webapp';
import { Meteor } from 'meteor/meteor';
import Agenda from 'agenda';
import Agendash from 'agendash';
import express from 'express';

const app = express();

let agenda;
if (process.env.NODE_ENV !== 'production') {
  agenda = new Agenda({ db: { address: 'mongodb://127.0.0.1:3001/meteor' } });
} else {
  agenda = new Agenda({ db: { address: process.env.MONGO_URL } });
}

app.use('/dash',
  function (req, res, next) {
    if (req.originalUrl === '/dash' || req.originalUrl === '/dash/') {
      res.send(401);
    }
    if (req.originalUrl.includes('/dash/?userId=')) {
      if (req.query.userId) {
        const user = Meteor.users.findOne(req.query.userId);
        if (user && user.admin) {
          next();
        } else {
          res.send(401);
        }
      } else {
        res.send(401);
      }
    } else {
      next();
    }
  },
  Agendash(agenda, { middleware: 'express' })
);

WebApp.connectHandlers.use(app);
