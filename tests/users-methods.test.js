import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import assert from 'assert';

import '../imports/api/users/methods';

if (Meteor.isServer) {
  describe('removeUser method', () => {
    it('removes user by id when called by admin', () => {
      resetDatabase();
      const adminId = Accounts.createUser({
        username: 'admin',
        password: 'adminadmin',
      });
      Meteor.users.update({ _id: adminId }, { $set: { admin: true } });
      const userId = Accounts.createUser({
        username: 'testuser',
        password: 'example123',
      });
      const usersCount = Meteor.users.find().fetch().length;
      assert.equal(usersCount, 2);

      const method = Meteor.server.method_handlers.removeUser;
      method.apply({ userId: adminId }, [userId]);
      const usersCountAfter = Meteor.users.find().fetch().length;
      assert.equal(usersCountAfter, 1);
      assert.equal(Meteor.users.findOne(userId), undefined);
    });

    it('does throw error when called by normal user', () => {
      resetDatabase();
      const userId1 = Accounts.createUser({
        username: 'nonadmin',
        password: 'nonadminadmin',
      });
      const userId2 = Accounts.createUser({
        username: 'testuser',
        password: 'example123',
      });
      const usersCount = Meteor.users.find().fetch().length;
      assert.equal(usersCount, 2);

      const method = Meteor.server.method_handlers.removeUser;
      try {
        method.apply({ userId: userId1 }, [userId2]);
      } catch (e) {
        assert(e.message, '[delete user error]');
      }
      const usersCountAfter = Meteor.users.find().fetch().length;
      assert.equal(usersCountAfter, 2);
    });
  });

  describe('addUser method', () => {
    it('creates user when called by admin', () => {
      resetDatabase();
      const adminId = Accounts.createUser({
        username: 'admin',
        password: 'adminadmin',
      });
      Meteor.users.update({ _id: adminId }, { $set: { admin: true } });
      const usersCount = Meteor.users.find().fetch().length;
      assert.equal(usersCount, 1);

      const method = Meteor.server.method_handlers.addUser;
      const data = { username: 'foo', password: 'barbarbar', admin: true };
      method.apply({ userId: adminId }, [data]);
      const usersCountAfter = Meteor.users.find().fetch().length;
      assert.equal(usersCountAfter, 2);
      assert.equal(Meteor.users.findOne({ username: 'foo' }).username, 'foo');
      assert.equal(Meteor.users.findOne({ username: 'foo' }).admin, true);
    });

    it('if admin not set, it creates non-admin', () => {
      resetDatabase();
      const adminId = Accounts.createUser({
        username: 'admin',
        password: 'adminadmin',
      });
      Meteor.users.update({ _id: adminId }, { $set: { admin: true } });
      const usersCount = Meteor.users.find().fetch().length;
      assert.equal(usersCount, 1);

      const method = Meteor.server.method_handlers.addUser;
      const data = { username: 'foo', password: 'barbarbar' };
      method.apply({ userId: adminId }, [data]);
      const usersCountAfter = Meteor.users.find().fetch().length;
      assert.equal(usersCountAfter, 2);
      assert.equal(Meteor.users.findOne({ username: 'foo' }).username, 'foo');
      assert.equal(Meteor.users.findOne({ username: 'foo' }).admin, false);
    });

    it('does throw error when called by normal user', () => {
      resetDatabase();
      const userId1 = Accounts.createUser({
        username: 'nonadmin',
        password: 'nonadminadmin',
      });
      const usersCount = Meteor.users.find().fetch().length;
      assert.equal(usersCount, 1);

      const method = Meteor.server.method_handlers.addUser;
      try {
        const data = { username: 'foo', password: 'barbarbar', admin: true };
        method.apply({ userId: userId1 }, [data]);
      } catch (e) {
        assert(e.message, '[add user error]');
      }
      const usersCountAfter = Meteor.users.find().fetch().length;
      assert.equal(usersCountAfter, 1);
    });
  });

  describe('updateUser method', () => {
    it('updates user when called by admin', () => {
      resetDatabase();
      const adminId = Accounts.createUser({
        username: 'admin',
        password: 'adminadmin',
      });
      Meteor.users.update({ _id: adminId }, { $set: { admin: true } });
      const userId = Accounts.createUser({
        username: 'testuser',
        password: 'example123',
      });
      const usersCount = Meteor.users.find().fetch().length;
      assert.equal(usersCount, 2);
      assert.equal(
        Meteor.users.findOne({ username: 'testuser' }).admin,
        undefined,
      );
      const passwordHashBefore = Meteor.users.findOne(userId).services.password
        .bcrypt;

      const method = Meteor.server.method_handlers.updateUser;
      const data = {
        _id: userId,
        username: 'foo',
        password: 'barbarbar',
        admin: true,
      };
      method.apply({ userId: adminId }, [data]);
      const usersCountAfter = Meteor.users.find().fetch().length;
      const passwordHashAfter = Meteor.users.findOne(userId).services.password
        .bcrypt;
      assert.equal(usersCountAfter, 2);
      assert.equal(Meteor.users.findOne({ username: 'foo' }).username, 'foo');
      assert.equal(Meteor.users.findOne({ username: 'foo' }).admin, true);
      assert.notEqual(passwordHashBefore, passwordHashAfter);
    });

    it('updates password only when given', () => {
      resetDatabase();
      const adminId = Accounts.createUser({
        username: 'admin',
        password: 'adminadmin',
      });
      Meteor.users.update({ _id: adminId }, { $set: { admin: true } });
      const userId = Accounts.createUser({
        username: 'testuser',
        password: 'example123',
      });
      const usersCount = Meteor.users.find().fetch().length;
      assert.equal(usersCount, 2);
      assert.equal(
        Meteor.users.findOne({ username: 'testuser' }).admin,
        undefined,
      );
      const passwordHashBefore = Meteor.users.findOne(userId).services.password
        .bcrypt;

      const method = Meteor.server.method_handlers.updateUser;
      const data = {
        username: 'testuser',
        _id: userId,
        admin: true,
      };
      method.apply({ userId: adminId }, [data]);
      const usersCountAfter = Meteor.users.find().fetch().length;
      assert.equal(usersCountAfter, 2);
      assert.equal(
        Meteor.users.findOne({ username: 'testuser' }).username,
        'testuser',
      );
      const passwordHashAfter = Meteor.users.findOne(userId).services.password
        .bcrypt;
      assert.equal(Meteor.users.findOne({ username: 'testuser' }).admin, true);
      assert.equal(passwordHashBefore, passwordHashAfter);
    });

    it('does throw error when called by normal user', () => {
      resetDatabase();
      const userId1 = Accounts.createUser({
        username: 'nonadmin',
        password: 'nonadminadmin',
      });
      const userId2 = Accounts.createUser({
        username: 'testuser',
        password: 'example123',
      });
      const usersCount = Meteor.users.find().fetch().length;
      assert.equal(usersCount, 2);

      const method = Meteor.server.method_handlers.updateUser;
      try {
        const data = {
          _id: userId2,
          username: 'foo',
          password: 'barbarbar',
          admin: true,
        };
        method.apply({ userId: userId1 }, [data]);
      } catch (e) {
        assert(e.message, '[update user error]');
      }
      const usersCountAfter = Meteor.users.find().fetch().length;
      assert.equal(usersCountAfter, 2);
    });
  });
}
