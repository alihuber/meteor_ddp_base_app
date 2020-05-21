import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'antd/es/modal/Modal';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm } from 'uniforms-antd';

const createUserSchema = new SimpleSchema({
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
  },
  admin: {
    type: Boolean,
    optional: true,
  },
});

const bridge = new SimpleSchema2Bridge(createUserSchema);

const CreateUserModal = ({ visible, onOk, onCancel }) => {
  let formRef = useRef(null);
  return (
    <Modal
      title="Create user"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={[]}
    >
      <AutoForm
        ref={(ref) => (formRef = ref)}
        schema={bridge}
        onSubmit={(doc) => {
          formRef.reset();
          onOk(doc);
        }}
      />
    </Modal>
  );
};

CreateUserModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CreateUserModal;
