import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { onPageLoad } from 'meteor/server-render';

import './publications.js';

Meteor.startup(() => {
  const user = Meteor.users.findOne({ username: 'admin' });
  if (!user) {
    // logger.info('admin user not found, seeding admin user...');
    Meteor.users.insert({ username: 'admin', admin: true });
    const newUser = Meteor.users.findOne({ username: 'admin' });
    const pw = process.env.ADMIN;
    Accounts.setPassword(newUser._id, pw);
  }

  // logger.info(`server started... registered users: ${Meteor.users.find({}).fetch().length}`);
});

onPageLoad((sink) => {
  // Code to run on every request.
  // sink.renderIntoElementById(
  //   "server-render-target",
  //   `Server time: ${new Date}`
  // );
});
