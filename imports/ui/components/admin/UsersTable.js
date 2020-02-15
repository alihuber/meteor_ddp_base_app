import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import { useTracker } from 'meteor/react-meteor-data';
import { Table, Divider, Icon, Button, Modal } from 'antd';
import Loading from '../Loading';

const { confirm } = Modal;

const UsersTable = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const showConfirmDelete = (userId) => {
    confirm({
      title: 'Do you Want to delete this user?',
      onOk() {
        Meteor.call('removeUser', userId, (err, res) => {
          if (err) {
            toast.error('Delete not successful!', {
              position: toast.POSITION.BOTTOM_CENTER,
            });
          } else {
            toast.success('Delete successful!', {
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        });
      },
    });
  };

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
  const usernameCol = {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  };
  const adminCol = {
    title: 'Admin',
    key: 'admin',
    render: (text, record) => {
      return <span>{record.admin ? <Icon type="check" /> : null}</span>;
    },
  };
  const actionCol = {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button type="primary" icon="edit" size="small" />
        <Divider type="vertical" />
        <Button
          type="danger"
          icon="delete"
          size="small"
          onClick={() => showConfirmDelete(record._id)}
        />
      </span>
    ),
  };
  if (isTabletOrMobile) {
    columns = [usernameCol, adminCol, actionCol];
  } else {
    columns = [
      {
        title: '_id',
        dataIndex: '_id',
        key: '_id',
      },
      usernameCol,
      adminCol,
      {
        title: 'Created at',
        key: 'createdAt',
        render: (text, record) => {
          const date = record.createdAt;
          const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          };
          return <span>{date.toLocaleDateString('de-DE', options)}</span>;
        },
      },
      actionCol,
    ];
  }

  return listLoading ? (
    <Loading />
  ) : (
    <Table columns={columns} dataSource={users} />
  );
};

export default UsersTable;
