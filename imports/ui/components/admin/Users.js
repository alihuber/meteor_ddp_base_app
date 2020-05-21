import React, { useContext } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import Title from 'antd/es/typography/Title';
import AnimationContext from '../../contexts/AnimationContext';
import UsersTable from './UsersTable';

const Users = () => {
  const animationClass = useContext(AnimationContext);
  const currentUser = useTracker(() => Meteor.user());
  return (
    <div className={animationClass}>
      <Title level={3}>Users</Title>
      {currentUser?.admin ? <UsersTable /> : null}
    </div>
  );
};

export default Users;
