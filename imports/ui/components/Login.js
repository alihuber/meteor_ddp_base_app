import { Meteor } from 'meteor/meteor';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AutoFields, AutoForm, ErrorsField, SubmitField } from 'uniforms-antd';
import Card from 'antd/es/card';
import SimpleSchema from 'simpl-schema';
import { toast } from 'react-toastify';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import AnimationContext from '../contexts/AnimationContext';

const loginSchema = new SimpleSchema({
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
});

const bridge = new SimpleSchema2Bridge(loginSchema);

const handleLogin = (history) => {
  history.push('/login');
};

const handleHome = (history) => {
  history.push('/');
};

const handleSubmit = (values, history) => {
  if (values.username && values.password) {
    Meteor.loginWithPassword(values.username, values.password, (err) => {
      if (err) {
        // console.log(err);
        toast.error('Login error!', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        handleLogin(history);
      } else {
        toast.success('Login successful!', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        handleHome(history);
      }
    });
  }
};

const LoginPage = () => {
  const animClass = useContext(AnimationContext);
  const history = useHistory();
  return (
    <div className={animClass}>
      <Card title="Login">
        <AutoForm
          schema={bridge}
          onSubmit={(doc) => handleSubmit(doc, history)}
        >
          <AutoFields />
          <ErrorsField />
          <br />
          <SubmitField />
        </AutoForm>
      </Card>
    </div>
  );
};

export default LoginPage;
