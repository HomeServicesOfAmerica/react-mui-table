import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import isEqual from 'lodash.isequal';
import ListColumns from './ListColumns';
import ListRow from './ListRow';
import Masthead from '../masthead';
import Pagination from '../pagination';
import Search from '../search';

// Validations:
//  Do not allow duplicate items in the table.
//  Not all props should be required, functionality should be disabled if props aren't receieved
//  Do not allow sortable: true or filterable: true in columns when they don't have a config in
//  `filters` or `sortOptions`

// NOTE: Stringifying each item and storing in an object in state seems more efficient

const deepRemove = (target, arr) => arr.filter(item => !isEqual(item, target));
const deepFind = (item, arr) => arr.find(current => isEqual(current, item));

const styles = {
  containerWrapper: {
    padding: '0 96px 0 96px',
  },
  listContentWrapper: {
    paddingTop: 0,
  },
};

export default class ReactMuiTable extends Component {
  state = {
    numRows: 15,
    itemsSelected: [],
  };

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

  handleDeletePointer = () => {
    if (this.props.handleDelete) {
      this.props.handleDelete(this.state.itemsSelected);
    }
  }

  render() {
    // Search should be optional component. If no relevant props, dont show it
    // NOTE: not sure if there is a more optimal way to do this, than inside the render func
    let optionalSearch;
    if (this.props.handleSearch) {
      optionalSearch = (
        <Search
          tableName={this.props.tableName || ''}
          handleSearch={this.props.handleSearch} />
      );
    }

    return (
      <div style={styles.containerWrapper}>
        <MuiThemeProvider>
          <div>
            {optionalSearch}

            <Paper zDepth={2}>
              <List style={styles.listContentWrapper}>
                <Masthead
                  itemSelectedCount={this.state.itemsSelected.length}
                  filters={this.props.filters}
                  handleDeletePointer={this.handleDeletePointer}
                  handleFilter={this.props.handleFilter} />
                <ListColumns
                  avatar={this.props.avatar || ''}
                  columns={this.props.columns}
                  handleSort={this.props.handleSort}
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
                    listRowOnclick={this.props.listRowOnclick}
                    columns={this.props.columns}
                    item={item}
                    deepFind={deepFind}
                    itemsSelected={this.state.itemsSelected}
                    actions={this.props.actions}
                    avatar={this.props.avatar || ''} />
                  )}
                <Pagination
                  hasNextPage={this.props.hasNextPage}
                  hasPreviousPage={this.props.hasPreviousPage}
                  paginationText={this.props.paginationText}
                  changeRowsPerPage={this.props.changeRowsPerPage}
                  nextPage={this.handleNextPage}
                  previousPage={this.handlePreviousPage}
                  numRows={this.state.numRows} />
              </List>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

ReactMuiTable.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    icon: PropTypes.string,
  })),
  avatar: PropTypes.string,
  columns: PropTypes.array.isRequired,
  filters: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    options: PropTypes.array,
  })),
  items: PropTypes.array.isRequired,
  sortOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    options: PropTypes.array,
  })),
  tableName: PropTypes.string,
  hasNextPage: PropTypes.bool,
  hasPreviousPage: PropTypes.bool,
  paginationText: PropTypes.string,
  changeRowsPerPage: PropTypes.func,
  nextPage: PropTypes.func,
  previousPage: PropTypes.func,
  handleRouting: PropTypes.func,
  handleDelete: PropTypes.func,
  handleFilter: PropTypes.func,
  handleSort: PropTypes.func,
  handleSearch: PropTypes.func,
  listRowOnclick: PropTypes.func,
};
