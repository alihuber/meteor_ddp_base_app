import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm } from 'uniforms-antd';

const editUserSchema = new SimpleSchema({
  username: {
    type: String,
    min: 3,
  },
  password: {
    type: String,
    min: 8,
    uniforms: {
      type: 'password',
    },
    optional: true,
  },
  admin: {
    type: Boolean,
    optional: true,
  },
});

const bridge = new SimpleSchema2Bridge(editUserSchema);

const EditUserModal = ({ user, visible, onOk, onCancel }) => {
  if (user) {
    const { username, admin, _id } = user;
    const model = { username, admin };
    const userId = _id;
    return (
      <Modal
        title="Edit user"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        footer={[]}
      >
        <AutoForm
          schema={bridge}
          onSubmit={(doc) => onOk(doc, userId)}
          model={model}
        />
      </Modal>
    );
  } else return null;
};

EditUserModal.propTypes = {
  user: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default EditUserModal;
