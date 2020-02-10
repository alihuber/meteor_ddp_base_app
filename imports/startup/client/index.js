/* eslint-disable react/no-unused-state */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import Root from '../../ui/components/Root';
import './react-transitions.css';

// import 'uniforms-bridge-simple-schema-2';

Meteor.startup(() => {
  render(<Root />, document.getElementById('render-target'));
});
