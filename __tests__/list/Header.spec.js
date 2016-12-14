import React from 'react';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from '../../src/components/list/Header';

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
