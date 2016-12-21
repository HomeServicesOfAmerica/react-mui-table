import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import isEqual from 'lodash.isequal';
import ListColumns from './ListColumns';
import ListRow from './ListRow';
import Masthead from '../masthead';
import Pagination from '../pagination';
import Search from '../search';

// TODO: Stop using `warning` in the render method. Prop validation should be done before that
// Validations:
//  Do not allow duplicate items in the table.
//  Not all props should be required, functionality should be disabled if props aren't receieved
//  Require items and columns.
//  Do not allow sortable: true or filterable: true in columns when they don't have a config in
//    `filters` or `sortOptions`

// NOTE: Stringifying each item and storing in an object in state seems more efficient

const deepRemove = (target, arr) => arr.filter(item => !isEqual(item, target));
const deepFind = (item, arr) => arr.find(current => isEqual(current, item));

// eslint-disable-next-line no-console
const warning = missingItem => console.warn(`There is no ${missingItem} passed down as props.`);

// eslint-disable-next-line react/prefer-stateless-function
export default class ReactMuiTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numRows: 15,
      itemsSelected: [],
    };
  }

  // NOTE: I'm not sure we should be doing this.
  shouldComponentUpdate = (nextProps, nextState) =>
    !(isEqual(nextProps, this.props) && isEqual(this.state, nextState))

  checkRow = (...items) => {
    const cleanSelected = [...this.state.itemsSelected];

    // Don't add duplicates
    items.forEach((item) => {
      if (!deepFind(item, cleanSelected)) {
        cleanSelected.push(item);
      }
    });

    this.setState({ itemsSelected: cleanSelected });
  }

  uncheckRow = (items) => {
    const cleanSelected = deepRemove(items, this.state.itemsSelected);
    this.setState({ itemsSelected: cleanSelected });
  }

  checkAllRows = () => this.setState({ itemsSelected: [...this.props.items] });

  uncheckAllRows = () => this.setState({ itemsSelected: [] });

  // We don't want selected items to persist between pages
  handleNextPage = () => {
    this.uncheckAllRows();
    this.props.nextPage();
  }
  handlePreviousPage = () => {
    this.uncheckAllRows();
    this.props.previousPage();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Search
            tableName={this.props.tableName || ''}
            handleSearch={this.props.handleSearch || warning('handleSearch function')} />
          <Paper zDepth={2}>
            <List>
              <Masthead
                itemsSelected={this.state.itemsSelected}
                filters={this.props.filters || warning('filter array of objects')}
                handleDelete={this.props.handleDelete || warning('handleDelete function')}
                handleFilter={this.props.handleFilter} />
              <ListColumns
                columns={this.props.columns || warning('columns array of objects')}
                handleSort={this.props.handleSort || warning('handleSort function')}
                sortOptions={this.props.sortOptions || []}
                selectedAll={this.state.itemsSelected.length === this.props.items.length}
                handleSelectAll={this.state.itemsSelected.length === this.props.items.length
                    ? this.uncheckAllRows
                    : this.checkAllRows} />
              {this.props.items.map((item, i) =>
                <ListRow
                  key={i}
                  checkRow={this.checkRow}
                  uncheckRow={this.uncheckRow}
                  columns={this.props.columns}
                  item={item}
                  deepFind={deepFind}
                  itemsSelected={this.state.itemsSelected}
                  actions={this.props.actions}
                  avatar={this.props.avatar || ''} />
                )}
              <Pagination
                hasNextPage={this.props.hasNextPage || warning('hasNextPage bool')}
                hasPreviousPage={this.props.hasPreviousPage || warning('hasPreviousPage bool')}
                paginationText={this.props.paginationText || warning('paginationText string')}
                changeRowsPerPage={this.props.changeRowsPerPage || warning('changeRowsPerPage function')}
                nextPage={this.handleNextPage || warning('nextPage function')}
                previousPage={this.handlePreviousPage || warning('previousPage function')}
                numRows={this.state.numRows} />
            </List>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}
