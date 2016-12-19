import React, { PureComponent } from 'react';
import selectn from 'selectn';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';

import ListColumns from './ListColumns';
import ListRow from './ListRow';
import Masthead from '../masthead';
import NoResults from './NoResults';
import Pagination from '../pagination';
import Search from '../search';

// const items = [
// 	{
// 		firstName: 'bob',
// 		lastName: 'ross',
// 		avatar: 'https://pbs.twimg.com/profile_images/659846506678124544/qptu8mfw.jpg',
// 	},
// 	{
// 		firstName: 'ragnar',
// 		lastName: 'lodbrok',
// 		avatar: 'https://pbs.twimg.com/profile_images/659846506678124544/qptu8mfw.jpg',
// 	},
// 	{
// 		firstName: 'rachael',
// 		lastName: 'ray',
// 		avatar: 'https://pbs.twimg.com/profile_images/659846506678124544/qptu8mfw.jpg',
// 	},
// 	{
// 		firstName: 'guy',
// 		lastName: 'fieri',
// 		avatar: '',
// 	},
// ];
//
// const columns = [
// 	{
// 		label: 'first name',
// 		key: 'firstName',
// 		sortable: true,
// 		filterable: true,
// 	},
// 	{
// 		label: 'last name',
// 		key: 'lastName',
// 		sortable: true,
// 		filterable: true,
// 	},
// 	{
// 		label: 'Photo',
// 		key: 'photo',
// 		sortable: true,
// 		filterable: true,
// 	},
// ];
//
// // Pagination props
// const hasNextPage = true;
// const hasPreviousPage = false;
// const paginationText = 'Showing results 1 - 15 of 300';
// const changeRowsPerPage = () => { /* external func */ };
// const nextPage = () => { /* external func */ };
// const previousPage = () => { /* external func */ };
//
// const handleRouting = (id) => { /* external func */ };
// const handleDelete = (id) => { /* external func */ };
//
// const actions = [{
//   action: 'delete',
//   handler: this.props.handleDelete,
//   icon: 'Trashcan',
// }, {
//   action: 'edit',
//   handler: this.props.handleRouting,
//   icon: 'Edit',
// }];
//
// const handleFilter = () => { /* external func */ };
// const handleSort = () => { /* external func */ };
// const handleSearch = () => { /* external func */ };
//
// const filters = [{
//   label: 'role',
//   options: [],
//   handler: this.props.handleFilter,
// }];
//
// const avatar = 'profilePhoto.sizes.small.src';


// eslint-disable-next-line react/prefer-stateless-function
export default class ReactMuiTable extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			numRows: 15,
			itemsSelected: [],
		};

		// this.runFilter = this.runFilter.bind(this);
		// this.runSort = this.runSort.bind(this);
		this.checkAllRows = this.checkAllRows.bind(this);
		this.uncheckAllRows = this.uncheckAllRows.bind(this);
		this.checkRow = this.checkRow.bind(this);
		this.uncheckRow = this.uncheckRow.bind(this);
		this.warning = this.warning.bind(this);
	}

	// runFilter() {
	//
	// }
	//
	// runSort() {
	//
	// }

	checkAllRows() {
		// TODO: add all rows to this.state.itemsSelected
		return 'check all rows';
	}

	uncheckAllRows() {
		this.setState({
			itemsSelected: []
		});
	}

	checkRow () {
		return 'check single row';
	}

	uncheckRow() {
		return 'uncheck single row';
	}

	warning(missingItem) {
		console.warn(`There is no ${missingItem} passed down as props.`);
	}

  render() {
		let items = selectn('props.items', this) || this.warning('items array of objects');

    return (
			<MuiThemeProvider>
				<span>
					{Search({
						tableName: selectn('props.tableName') || '',
						handleSearch: selectn('props.handleSearch') || this.warning('handleSearch function'),
					})}
					<Paper zDepth={2}>
			      <List>
							{Masthead({
								itemsSelected: this.state.itemsSelected,
								handleDelete: selectn('props.handleDelete') || this.warning('handleDelete function'),
								handleFilter: selectn('props.handleFilter') || this.warning('handleFilter function'),
								filters: selectn('props.filters' || this.warning('filter array of objects')),
							})}

							{ListColumns({
								columns: selectn('props.columns', this) || this.warning('columns array of objects'),
								handleSort: selectn('props.handleSort', this) || this.warning('handleSort function'),
							})}

							{items.map((item, i) =>
								<ListRow
									key={i}
									item={item}
									actions={selectn('props.actions', this)}
									avatar={selectn('props.avatar') || this.warning('avatar string')} />)}

			        <Pagination
								hasNextPage={selectn('props.hasNextPage', this) || this.warning('hasNextPage boolean')}
								hasPreviousPage={selectn('props.hasPreviousPage', this) || this.warning('hasPreviousPage boolean')}
								paginationText={selectn('props.paginationText', this) || this.warning('paginationText string')}
								changeRowsPerPage={selectn('props.changeRowsPerPage', this) || this.warning('changeRowsPerPage function')}
								nextPage={selectn('props.nextPage', this) || this.warning('nextPage function')}
								previousPage={selectn('props.previousPage', this) || this.warning('previousPage function')}
								numRows={selectn('state.numRows', this)} />
			      </List>
					</Paper>
				</span>
			</MuiThemeProvider>
    );
  }
}
