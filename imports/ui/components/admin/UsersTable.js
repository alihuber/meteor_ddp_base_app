import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import { useTracker } from 'meteor/react-meteor-data';
import { Table, Divider, Icon, Button } from 'antd';
import Loading from '../Loading';

const UsersTable = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const handleDelete = (userId) => {};

  const listLoading = useTracker(() => {
    const handle = Meteor.subscribe('userData');
    return !handle.ready();
  }, []);

  const users = useTracker(() =>
    Meteor.users
      .find({}, { fields: { username: 1, admin: 1, createdAt: 1 } })
      .fetch(),
  ).map((u) => {
    return { ...u, key: u._id };
  });

  let columns;
  if (isTabletOrMobile) {
    columns = [
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Admin',
        key: 'admin',
        render: (text, record) => {
          return <span>{record.admin ? <Icon type="check" /> : null}</span>;
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="primary" icon="edit" size="small" />
            <Divider type="vertical" />
            <Button type="danger" icon="delete" size="small" />
          </span>
        ),
      },
    ];
  } else {
    columns = [
      {
        title: '_id',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Admin',
        key: 'admin',
        render: (text, record) => {
          return <span>{record.admin ? <Icon type="check" /> : null}</span>;
        },
      },
      {
        title: 'Created at',
        key: 'createdAt',
        render: (text, record) => {
          const date = record.createdAt;
          const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };
          return <span>{date.toLocaleDateString('de-DE', options)}</span>;
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="primary" icon="edit" size="small" />
            <Divider type="vertical" />
            <Button type="danger" icon="delete" size="small" />
          </span>
        ),
      },
    ];
  }

  return listLoading ? (
    <Loading />
  ) : (
    <Table columns={columns} dataSource={users} />
  );
};

export default UsersTable;
