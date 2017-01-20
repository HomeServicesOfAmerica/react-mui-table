import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui/Table';
import { faintBlack } from 'material-ui/styles/colors';
import isEqual from 'lodash.isequal';
import Avatar from 'material-ui/Avatar';
import FallbackIcon from 'material-ui/svg-icons/social/person';
import respondable from 'respondable';
import selectn from 'selectn';
import MaterialHeaderColumn from './MaterialHeaderColumn';
import ActionBar from './ActionBar';
import Pagination from './Pagination';
import ActionMenu from './ActionMenu';
import Search from './Search';


const styles = {
  smallColumn: {
    padding: 0,
    width: 40,
  },
  tableBody: {
    borderBottom: `1px solid ${faintBlack}`,
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

export default class MaterialTable extends Component {
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

  handleRowClick = (rowId, colId) => {
    if (!this.props.onItemClick) return null; // Do nothing if no click handler
    if (colId < 0) return null; // Do nothing if clicking the checkbox
    const { itemsSelected } = this.state;
    if (itemsSelected.length > 0 && !itemsSelected.includes(rowId)) {
      // Do nothing after having selected other items and clicking a row
      return null;
    }
    return this.props.onItemClick(this.props.items[rowId]);
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
          <ActionBar
            itemSelectedCount={this.state.itemsSelected.length}
            filters={this.props.filters}
            handleDelete={this.handleDelete}
            handleFilter={this.props.handleFilter} />
          <Table
            onCellClick={this.handleRowClick}
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
                    <MaterialHeaderColumn
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
            <TableBody showRowHover style={styles.tableBody}>
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
                      <ActionMenu
                        actions={this.props.actions}
                        item={item}
                        itemId={item[this.props.itemUniqueId]} />
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
