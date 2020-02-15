import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', function() {
  const userId = this.userId;
  const user = Meteor.users.findOne({ _id: userId });
  if (user && user.admin) {
    return Meteor.users.find(
      {},
      { fields: { username: 1, admin: 1, createdAt: 1 } },
    );
  } else {
    return [];
  }
});

Meteor.publish('currentUser', function() {
  const userId = this.userId;
  if (userId) {
    return Meteor.users.find(
      { _id: userId },
      { fields: { _id: 1, username: 1, admin: 1, createdAt: 1 } },
    );
  } else {
    return this.ready();
  }
});
