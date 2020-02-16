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
      username: String,
      password: Match.Maybe(String),
      admin: Boolean,
    };
    check(data, pattern);
    const thisUser = Meteor.users.findOne(this.userId);
    const isAdmin = thisUser?.admin;
    if (isAdmin) {
      if (data.password) {
        Accounts.setPassword(data._id, data.password);
      }
      if (data.username) {
        Accounts.setUsername(data._id, data.username);
      }
      Meteor.users.update({ _id: data._id }, { $set: { admin: data.admin } });
    } else {
      throw new Meteor.Error('update user error');
    }
  },
  addUser: function(data) {
    const pattern = {
      username: String,
      password: String,
      admin: Match.Maybe(Boolean),
    };
    check(data, pattern);
    const thisUser = Meteor.users.findOne(this.userId);
    const isAdmin = thisUser?.admin;
    if (isAdmin) {
      const newId = Accounts.createUser(data);
      const admin = data.admin || false;
      Meteor.users.update({ _id: newId }, { $set: { admin } });
    } else {
      throw new Meteor.Error('update user error');
    }
  },
});
