import React from 'react';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TableHeaderColumn } from 'material-ui/Table';

import Header from '../../src/components/table/Header';

const mockHeaderData = [
	{ title: 'name' },
	{ title: 'age' },
	{ title: 'job' },
];

const HeaderComponent =
  <MuiThemeProvider>
    {Header(mockHeaderData)}
  </MuiThemeProvider>;


describe('Header', () => {
  it('renders the header', () => {
    mount(HeaderComponent);
  });
});
