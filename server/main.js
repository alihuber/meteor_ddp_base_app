import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { onPageLoad } from 'meteor/server-render';
import './agenda';
import './publications.js';
import '../imports/startup/server/methods';

const { createLogger, transports, format } = require('winston');

const { combine, timestamp, label, printf } = format;

const loggerFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(label({ label: 'server/main' }), timestamp(), loggerFormat),
  transports: [new transports.Console()],
});

Meteor.startup(() => {
  const user = Meteor.users.findOne({ username: 'admin' });
  if (!user) {
    logger.info('admin user not found, seeding admin user...');
    Meteor.users.insert({ username: 'admin', admin: true });
    const newUser = Meteor.users.findOne({ username: 'admin' });
    const pw = process.env.ADMIN || 'adminadmin';
    Accounts.setPassword(newUser._id, pw);
  }

  logger.info(`server started... registered users: ${Meteor.users.find({}).fetch().length}`);
});

onPageLoad((sink) => {
  // Code to run on every request.
  // sink.renderIntoElementById(
  //   "server-render-target",
  //   `Server time: ${new Date}`
  // );
});
