import React from 'react';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Table from '../../src/components/table';

const HeaderComponent =
  <MuiThemeProvider>
    <Table/>
  </MuiThemeProvider>;


describe('Table', () => {
  it('renders the table', () => {
    mount(HeaderComponent);
  });
});
