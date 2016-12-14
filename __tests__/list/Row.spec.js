import React from 'react';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Row from '../../src/components/list/ListRow';

const mockRowData = {
  name: 'bob',
  age: 30,
  job: 'engineer',
};

const RowComponent =
  <MuiThemeProvider>
    <Row data={mockRowData} />
  </MuiThemeProvider>;

describe('Row', () => {
  it('renders a list row component', () => {
    mount(RowComponent);
  });
});
