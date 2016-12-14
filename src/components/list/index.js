import React, { PureComponent } from 'react';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import Header from './Header';
import ListRow from './ListRow';
import Pagination from '../pagination';

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
//  initialRowsPerpage: 10,
// };

// eslint-disable-next-line react/prefer-stateless-function
export default class ReactMuiTable extends PureComponent {
  render() {
    return (
      <List>
				{headerData ? Header(headerData) : ''}
				{headerData ? <Divider /> : ''}
				{bodyData.map((data, i) =>
					<span key={i}>
						<ListRow data={data} />
						<Divider />
					</span>
				)}
        <Pagination />
      </List>
    );
  }
}
