import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import Header from './components/Header';
import Row from './components/Row';


// needs to accept data for table header

// needs to accept data for table body

// # of records to show per page

// sorting && filter TBD


// example data
const headerData = [
	{ title: 'name' },
	{ title: 'age' },
	{ title: 'job' },
];

const bodyData = [
	{ name: 'bob', age: 30, job: 'engineer' },
	{ name: 'jane', age: 25, job: 'designer' },
];

// eslint-disable-next-line react/prefer-stateless-function
export default class ReactMuiTable extends PureComponent {
  render() {
    return (
      <Table>
				{ headerData ? Header(headerData) : '' }

        <TableBody displayRowCheckbox={true}>
					{ bodyData.map((data, i) => <Row key={i} data={data} />) }
        </TableBody>
      </Table>
    );
  }
}

// Render for local dev validation
render (
	<MuiThemeProvider>
		<ReactMuiTable />
	</MuiThemeProvider>,
	document.getElementById('app')
);
