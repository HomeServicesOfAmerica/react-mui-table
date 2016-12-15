import React, { PureComponent } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import Header from './Header';
import ListRow from './ListRow';
import Masthead from '../masthead';
import Pagination from '../pagination';

// example data for development
const mockBodyData = [
	{
		firstName: 'bob',
		lastName: 'ross',
	},
	{
		firstName: 'ragnar',
		lastName: 'lodbrock',
	},
	{
		firstName: 'rachel',
		lastName: 'rae',
	},
	{
		firstName: 'guy',
		lastName: 'fieri',
	},
];

const mockHeaderData = [
	{
		label: 'first name',
		key: 'firstName',
		sortable: true,
		searchable: true,
	},
	{
		label: 'last name',
		key: 'lastName',
		sortable: true,
		searchable: true,
	},
];

const mockPageData = [
	{ 'hasNextPage': true },
	{ 'hasPreviousPage': false },
	{ 'startCursor': 'YXJyYXljb25uZWN0aW9uJDU3MSQw' },
	{ 'endCursor': 'YXJyYXljb25uZWN0aW9uJDUwMyQxNA==' },
];


// eslint-disable-next-line react/prefer-stateless-function
export default class ReactMuiTable extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			numRows: 15,
			currentPage: 1,
			itemsSelected: [],
		};

		this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
		this.changeNumRows = this.changeNumRows.bind(this);
	}

	nextPage(pageNum) {
    if (pageNum !== this.state.currentPage) {
			// TODO: run func to update query for new page

      this.setState ({
        currentPage: this.state.currentPage++
      });
    }
  }

  previousPage(pageNum) {
    if (pageNum !== this.state.currentPage) {
			// TODO: run func from expected props to update query for new page

      this.setState ({
        currentPage: this.state.currentPage--
      });
    }
  }

	changeNumRows(numRows) {
		if(numRows !== this.state.numRows) {
			// TODO: run func from props to update query for new numRows

			this.setState({
				numRows: numRows
			});
		}
	}

  render() {
		// While developing, use mock data until figuring out a better way to do this
		let headerData = !this.props.headerData ? mockHeaderData : this.props.headerData;
		let bodyData = !this.props.bodyData ? mockBodyData : this.props.bodyData;
		let pageData = !this.props.pageData ? mockPageData : this.props.pageData;

    return (
			<MuiThemeProvider>
				<Paper zDepth={2}>
		      <List>
						{Masthead({itemsSelected: this.state.itemsSelected})}
						{Header(headerData)}

						{bodyData.map((data, i) =>
							<span key={i}>
								<ListRow data={data} />
								<Divider />
							</span>
						)}
		        <Pagination
							currentPage={this.state.currentPage}
							numRows={this.state.numRows}
							pageData={pageData}
							changeNumRows={this.changeNumRows}
							nextPage={this.nextPage}
							previousPage={this.previousPage} />
		      </List>
				</Paper>
			</MuiThemeProvider>
    );
  }
}
