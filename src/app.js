import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import Header from './components/Header';
// import Body from './components/Body';


// needs to accept data for table header

// needs to accept data for table body

// # of records to show per page

// sorting && filter TBD


// example data
const headerData = [
	{ title: 'one' },
	{ title: 'two' },
	{ title: 'three' },
];

const bodyData = [
	{},
	{},
];


class ReactMuiTable extends PureComponent {
  render() {
    return (
      <Table>
				{ Header(headerData) }

        <TableBody>
          <TableRow>
            <TableRowColumn>One row of content</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

// Render for local dev validation
render(
	<MuiThemeProvider>
		<ReactMuiTable />
	</MuiThemeProvider>,
	document.getElementById('app')
);
