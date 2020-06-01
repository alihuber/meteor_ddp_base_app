import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import { useTracker } from 'meteor/react-meteor-data';
import Table from 'antd/es/table/Table';
import Divider from 'antd/es/divider';
import Button from 'antd/es/button/button';
import confirm from 'antd/es/modal/confirm';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditUserModal from './EditUserModal';
import CreateUserModal from './CreateUserModal';
import Loading from '../Loading';

const UsersTable = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editUser, setEditUser] = useState(null);
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

  const showEditUserModal = (user) => {
    setEditUser(user);
    setEditModalVisible(true);
  };

  const handleEditOk = (data, userId) => {
    const update = { ...data, _id: userId };
    Meteor.call('updateUser', update, (err, res) => {
      if (err) {
        toast.error('Update not successful!', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.success('Update successful!', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    });
    setEditUser(null);
    setEditModalVisible(false);
  };

  const handleCreateOk = (data) => {
    Meteor.call('addUser', data, (err, res) => {
      if (err) {
        toast.error('Create not successful!', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.success('Create successful!', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    });
    setCreateModalVisible(false);
  };

  const handleCreateCancel = () => {
    setCreateModalVisible(false);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditUser(null);
  };

  const listLoading = useTracker(() => {
    const handle = Meteor.subscribe('userData');
    return !handle.ready();
  }, []);

  const users = useTracker(() =>
    Meteor.users
      .find(
        {},
        {
          fields: { username: 1, admin: 1, createdAt: 1 },
          sort: { createdAt: -1 },
        },
      )
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
      return <span>{record.admin ? <CheckOutlined /> : null}</span>;
    },
  };
  const actionCol = {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button
          id={`editUser_${record._id}`}
          type="primary"
          icon={<EditOutlined />}
          size="small"
          onClick={() => showEditUserModal(record)}
        />
        <Divider type="vertical" />
        <Button
          id={`deleteUser_${record._id}`}
          type="danger"
          icon={<DeleteOutlined />}
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
          return <span>{date && date.toLocaleDateString('de-DE', options)}</span>;
        },
      },
      actionCol,
    ];
  }

  return listLoading ? (
    <Loading />
  ) : (
      <>
        <Button
          id="createUserButton"
          type="primary"
          onClick={() => setCreateModalVisible(true)}
        >
          Create user
      </Button>
        <br />
        {' '}
        &nbsp;
        <Table columns={columns} dataSource={users} />
        <EditUserModal
          user={editUser}
          visible={editModalVisible}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        />
        <CreateUserModal
          visible={createModalVisible}
          onOk={handleCreateOk}
          onCancel={handleCreateCancel}
        />
      </>
    );
};

export default UsersTable;
