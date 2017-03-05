import React from 'react';
import { mount } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const mountWithMUIContext = (node, context = {}, childContextTypes = {}) =>
  mount(node, {
    context: {
      muiTheme: getMuiTheme(),
      ...context,
    },
    childContextTypes: {
      muiTheme: React.PropTypes.object,
      ...childContextTypes,
    },
  });

export default mountWithMUIContext;
