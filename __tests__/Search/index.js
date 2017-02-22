import React, { Component } from 'react';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Search from '../../src/components/Search';

const mockedProps = {
  tableName: 'Hi',
  onSearch: () => {},
};

const TableComponent = (
  <MuiThemeProvider>
    <Search {...mockedProps} />
  </MuiThemeProvider>
);

describe('Table', () => {
  it('renders the table', () => {
    mount(TableComponent);
  });
});
