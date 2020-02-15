import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import Root from '../../ui/components/Root';
import './react-transitions.css';

import 'react-toastify/dist/ReactToastify.min.css';
import 'uniforms-bridge-simple-schema-2';

import '../../api/users/methods';

Meteor.startup(() => {
  render(<Root />, document.getElementById('render-target'));
});
