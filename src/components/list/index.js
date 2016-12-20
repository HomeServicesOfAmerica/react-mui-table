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

// eslint-disable-next-line react/prefer-stateless-function
export default class ReactMuiTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numRows: 15,
      itemsSelected: [],
      selectedAll: false,
    };

    this.checkAllRows = this.checkAllRows.bind(this);
    this.uncheckAllRows = this.uncheckAllRows.bind(this);
    this.checkRow = this.checkRow.bind(this);
    this.uncheckRow = this.uncheckRow.bind(this);
    this.warning = this.warning.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps, this.props);
  }

  checkAllRows() {
    // TODO: add all rows to this.state.itemsSelected
    console.log('TODO: check rows');
  }

  uncheckAllRows() {
    this.setState({
      itemsSelected: [],
    });
  }

  checkRow() {
    return 'check single row';
  }

  uncheckRow() {
    return 'uncheck single row';
  }

  warning(missingItem) {
    // eslint-disable-next-line no-console
    console.warn(`There is no ${missingItem} passed down as props.`);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <span>
            <Search
              tableName={this.props.tableName || ''}
              handleSearch={this.props.handleSearch || this.warning('handleSearch function')} />
            <Paper zDepth={2}>
              <List>
                <Masthead
                  itemsSelected={this.state.itemsSelected}
                  handleDelete={this.props.handleDelete || this.warning('handleDelete function')}
                  filters={this.props.filters || this.warning('filter array of objects')}
                  handleFilter={this.props.handleFilter} />
                <ListColumns
                  columns={this.props.columns || this.warning('columns array of objects')}
                  handleSort={this.props.handleSort || this.warning('handleSort function')}
                  sortOptions={this.props.sortOptions || []}
                  selectedAll={this.state.selectedAll}
                  handleSelectAll={this.state.selectedAll
                    ? this.uncheckAllRows
                    : this.checkAllRows} />
                {this.props.items.map((item, i) =>
                  <ListRow
                    key={i}
                    columns={this.props.columns}
                    item={item}
                    actions={this.props.actions}
                    avatar={this.props.avatar || ''} />
                )}
                <Pagination
                  hasNextPage={this.props.hasNextPage || this.warning('hasNextPage bool')}
                  hasPreviousPage={this.props.hasPreviousPage || this.warning('hasPreviousPage bool')}
                  paginationText={this.props.paginationText || this.warning('paginationText string')}
                  changeRowsPerPage={this.props.changeRowsPerPage || this.warning('changeRowsPerPage function')}
                  nextPage={this.props.nextPage || this.warning('nextPage function')}
                  previousPage={this.props.previousPage || this.warning('previousPage function')}
                  numRows={this.state.numRows} />
              </List>
            </Paper>
          </span>
        </MuiThemeProvider>
      </div>
    );
  }
}
