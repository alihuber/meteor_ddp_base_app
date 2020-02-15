import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
// import { logger }       from '../../server-logger';

Meteor.methods({
  removeUser: function(userId) {
    check(userId, String);
    const isAdmin = Meteor.users.findOne(this.userId).admin;
    if (isAdmin) {
      // logger.warn(`deleted user with id ${userId}`);
      Meteor.users.remove({ _id: userId });
    } else {
      throw new Meteor.Error('delete user error');
    }
  },
  updateUser: function(data) {
    const pattern = {
      _id: String,
      username: Match.Maybe(String),
      newPassword: Match.Maybe(String),
    };
    check(data, pattern);
    const isAdmin = Meteor.users.findOne(this.userId).admin;
    if (isAdmin) {
      if (data.newPassword) {
        Accounts.setPassword(data._id, data.newPassword);
      }
      if (data.username) {
        Accounts.setUsername(data._id, data.username);
      }
    } else {
      throw new Meteor.Error('update user error');
    }
  },
});
