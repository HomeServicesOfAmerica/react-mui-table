import React from 'react';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import List from '../../src/components/list';

const ListComponent =
  <MuiThemeProvider>
    <List />
  </MuiThemeProvider>;


describe('List', () => {
  it('renders the list', () => {
    mount(ListComponent);
  });
});
