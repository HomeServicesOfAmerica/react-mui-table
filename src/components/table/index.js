import React, { PureComponent } from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import Header from './Header';
import Row from './Row';


// example data for development
const headerData = [
	{ title: 'name' },
	{ title: 'age' },
	{ title: 'job' },
];

const bodyData = [
	{ name: 'bob', age: 30, job: 'engineer' },
	{ name: 'jane', age: 25, job: 'designer' },
];

// const options = {
//	showMasthead: true,
// 	showHeaderCheckBox: true,
// 	showRowCheckBox: true,
// };

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
