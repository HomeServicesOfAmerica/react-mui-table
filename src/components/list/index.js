import React, { PureComponent } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import selectn from 'selectn';

import Header from './Header';
import ListRow from './ListRow';
import Pagination from '../pagination';

// example data for development
import mockBodyData from '../../data/userNames.json';
const mockHeaderData = [
	{ title: 'name' },
	{ title: 'age' },
	{ title: 'job' },
];
// const mockOptions = {
//	showMasthead: true,
// 	showHeaderCheckBox: true,
// 	showRowCheckBox: true,
//  initialRowsPerpage: 10,
// };

// eslint-disable-next-line react/prefer-stateless-function
export default class ReactMuiTable extends PureComponent {
	constructor(props) {
		super(props);

		this.parseBodyData = this.parseBodyData.bind(this);
	}

	parseBodyData(data) {
		return data.map(node => selectn('node', node));
	}

  render() {
		// While developing, use mock data until figuring out a better way to do this
		let headerData = !this.props.headerData ? mockHeaderData : this.props.headerData;
		let bodyData = !this.props.bodyData ? this.parseBodyData(mockBodyData.data.viewer.users.edges) : this.parseBodyData(this.props.bodyData);
		let paginationData = mockBodyData.data.viewer.users.pageInfo;

    return (
			<MuiThemeProvider>
				<Paper zDepth={2}>
		      <List>
						{Header(headerData)}
						<Divider />
						{bodyData.map((data, i) =>
							<span key={i}>
								<ListRow data={data} />
								<Divider />
							</span>
						)}
		        <Pagination
							data={paginationData}/>
		      </List>
				</Paper>
			</MuiThemeProvider>
    );
  }
}
