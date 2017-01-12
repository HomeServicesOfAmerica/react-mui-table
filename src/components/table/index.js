import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui/table';
import isEqual from 'lodash.isequal';
import Avatar from 'material-ui/Avatar';
import FallbackIcon from 'material-ui/svg-icons/social/person';
import respondable from 'respondable';
import selectn from 'selectn';
import HeaderColumn from './HeaderColumn';
import Masthead from '../masthead';
import Pagination from '../pagination';
import ActionMenu from './ActionMenu';
import Search from '../search';


const styles = {
  smallColumn: {
    padding: 0,
    width: 40,
  },
};

const breakpointObject = {
  'screen and (max-width: 413px)': 'xs',
  'screen and (min-width: 414px) and (max-width: 767px)': 'sm',
  'screen and (min-width: 768px) and (max-width: 1079px)': 'md',
  'screen and (min-width: 1080px) and (max-width: 1399px)': 'lg',
  'screen and (min-width: 1400px)': 'xl',
};

const priorities = ['xs', 'sm', 'md', 'lg', 'xl'];

export default class ReactMuiTable extends Component {
  columnMap = new Map();
  state = {
    itemsSelected: [],
  };

  componentDidMount() {
    this.destroyRespondable = respondable(breakpointObject, this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.columns, this.props.columns)) this.columnMap.clear();
  }

  // NOTE: I'm not sure we should be doing this.
  shouldComponentUpdate(nextProps, nextState) {
    return !(isEqual(nextProps, this.props) && isEqual(this.state, nextState));
  }
  
  componentWillUnmount() {
    this.destroyRespondable();
  }

  handleResize = (active) => {
    this.setState({ viewSize: active[0] });
  };

  handleRowSelection = (selected) => {
    let itemsSelected = selected;
    if (selected === 'all') {
      itemsSelected = Array(this.props.rows).map((_, idx) => idx);
    }
    if (selected === 'none') itemsSelected = [];
    this.setState({ itemsSelected });
  }

  // We don't want selected items to persist between pages
  handleNextPage = () => {
    this.handleRowSelection('none');
    this.props.nextPage();
  }
  handlePreviousPage = () => {
    this.handleRowSelection('none');
    this.props.previousPage();
  }

  handleDelete = () => {
    if (this.props.handleDelete) {
      this.props.handleDelete(this.state.itemsSelected.map(idx => this.props.items[idx]));
    }
  }

  displayColumn = (column) => {
    if (typeof column[this.state.viewSize] === 'boolean') return column[this.state.viewSize];
    if (this.columnMap.has(column.label)) return this.columnMap.get(column.label);
    const currentPriority = priorities.indexOf(this.state.viewSize);
    for (const size of priorities.slice(currentPriority)) {
      if (typeof column[size] === 'boolean') {
        this.columnMap.set(column.label, column[size]);
        return column[size];
      }
    }
    this.columnMap.set(column.label, true);
    return true;
  }

  displayAvatar = () => this.displayColumn({ sm: false });

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
      <div className={this.props.containerClass} style={this.props.containerStyle}>
        {optionalSearch}
        <Paper zDepth={2}>
          <Masthead
            itemSelectedCount={this.state.itemsSelected.length}
            filters={this.props.filters}
            handleDelete={this.handleDelete}
            handleFilter={this.props.handleFilter} />
          <Table
            onRowSelection={this.handleRowSelection}
            multiSelectable>
            <TableHeader>
              <TableRow>
                {this.props.avatar && this.displayAvatar() && (
                  <TableHeaderColumn style={styles.smallColumn} />
                )}
                {this.props.columns.map((column) => {
                  if (!this.displayColumn(column)) return null;
                  return (
                    <HeaderColumn
                      key={column.label}
                      fieldKey={column.key}
                      handleSort={this.props.handleSort}
                      currentSort={this.props.currentSort}
                      {...column} />
                  );
                })}
                {this.props.actions && this.props.actions.length > 0 && (
                  <TableHeaderColumn style={styles.smallColumn} />
                )}
              </TableRow>
            </TableHeader>
            <TableBody showRowHover>
              {this.props.items.map((item, tableIdx) => (
                <TableRow
                  key={item[this.props.itemUniqueId]}
                  selected={this.state.itemsSelected.includes(tableIdx)}>
                  {this.props.avatar && this.displayAvatar() && (
                    <TableRowColumn style={styles.smallColumn}>
                      <Avatar
                        src={selectn(this.props.avatar, item)}
                        icon={<FallbackIcon />} />
                    </TableRowColumn>
                  )}
                  {this.props.columns.map((column) => {
                    if (!this.displayColumn(column)) return null;
                    let columnValue = selectn(column.key, item);
                    if (columnValue && column.format) columnValue = column.format(columnValue);
                    return (
                      <TableRowColumn key={column.label} colSpan={column.colSpan}>
                        {columnValue || ''}
                      </TableRowColumn>
                    );
                  })}
                  {this.props.actions && this.props.actions.length > 0 && (
                    <TableRowColumn style={styles.smallColumn}>
                      <ActionMenu actions={this.props.actions} item={item} itemId={item[this.props.itemUniqueId]} />
                    </TableRowColumn>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            hasNextPage={this.props.hasNextPage}
            hasPreviousPage={this.props.hasPreviousPage}
            paginationText={this.props.paginationText}
            changeRowsPerPage={this.props.changeRowsPerPage}
            nextPage={this.handleNextPage}
            previousPage={this.handlePreviousPage}
            rows={this.props.rows} />
        </Paper>
      </div>
    );
  }
}