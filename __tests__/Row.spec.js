import React from 'react';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Row from '../src/components/Row';

const mockRowData = {
  name: 'bob',
  age: 30,
  job: 'engineer',
};

const muiProps = {
  children: [{}]
};

const RowComponent =
  <MuiThemeProvider>
    <Row data={mockRowData}>
      {muiProps.children[0]}
    </Row>
  </MuiThemeProvider>;

describe('Row', () => {
  it('renders a table row component', () => {
    mount(RowComponent);
  });
});
