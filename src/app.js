import React, { Component } from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

// needs to accept data for table header

// needs to accept data for table body

// # of records to show per page

// sorting && filter TBD

export default class ReactMuiTable extends Component {
  render() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>One Column</TableHeaderColumn>
          </TableRow>
        </TableHeader>
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
