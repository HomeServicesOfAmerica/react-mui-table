// @flow
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui/Table';
import isEqual from 'lodash.isequal';
import Avatar from 'material-ui/Avatar';
import FallbackIcon from 'material-ui/svg-icons/social/person';
import respondable from 'respondable';
import selectn from 'selectn';
import Checkbox from 'material-ui/Checkbox';

import MaterialHeaderColumn from '../MaterialHeaderColumn';
import ActionBar from '../ActionBar';
import Pagination from '../Pagination';
import ActionMenu from '../ActionMenu';
import Search from '../Search';
import styles from './styles';
import type { NoArgsNoReturn } from '../../../flow/common-types';
import type {
  MaterialTableState,
  MaterialTableProps,
  OnSearch,
  HandleResize,
  HandleSelect,
  HandleRowClick,
  DisplayColumn,
  DisplayAvatar,
  ToggleAll,
} from './types';

const breakpointObject = {
  'screen and (max-width: 413px)': 'xs',
  'screen and (min-width: 414px) and (max-width: 767px)': 'sm',
  'screen and (min-width: 768px) and (max-width: 1079px)': 'md',
  'screen and (min-width: 1080px) and (max-width: 1399px)': 'lg',
  'screen and (min-width: 1400px)': 'xl',
};

const priorities = ['xs', 'sm', 'md', 'lg', 'xl'];

export default class MaterialTable extends Component {
  props: MaterialTableProps
  columnMap: Map<string, boolean> = new Map();
  destroyRespondable: Function = () => {};
  state: MaterialTableState = {
    selections: this.props.items.map(() => false),
    countSelected: 0,
    allSelected: false,
    viewSize: undefined,
  };

  componentDidMount() {
    this.destroyRespondable = respondable(breakpointObject, this.handleResize);
  }

  componentWillReceiveProps(nextProps: MaterialTableProps) {
    if (!isEqual(nextProps.columns, this.props.columns)) this.columnMap.clear();
  }

  // NOTE: This will hinder performance if data sets are large enough
  shouldComponentUpdate(nextProps: MaterialTableProps, nextState: MaterialTableState) {
    return !(isEqual(nextProps, this.props) && isEqual(this.state, nextState));
  }

  componentWillUnmount() {
    this.destroyRespondable();
  }

  handleSelectAll: NoArgsNoReturn = () => {
    this.toggleAll(this.state.allSelected);
  };

  toggleAll: ToggleAll = (allSelected) => {
    let payload;
    if (!allSelected) {
      payload = {
        selections: this.props.items.map(() => true),
        countSelected: this.props.items.length,
      };
    } else {
      payload = {
        selections: this.props.items.map(() => false),
        countSelected: 0,
      };
    }

    this.setState({
      allSelected: !allSelected,
      ...payload,
    });
  };

  handleSelect: HandleSelect = (event, checked) => {
    const key = event.target.dataset.key;
    const selections = this.state.selections.slice();

    selections[key] = checked;

    const countSelected = selections.filter(a => Boolean(a)).length;
    const allSelected = countSelected === this.props.items.length;
    this.setState({
      selections,
      countSelected,
      allSelected,
    });
  };

  handleResize: HandleResize = (active) => {
    this.setState({ viewSize: active[0] });
  };

  handleRowClick: HandleRowClick = (rowId, colId) => {
    // Adding 3 because checkbox, avatar, menu aren't included, and they increase the column count
    // even if they aren't rendered.
    const menuColId = this.props.columns.length + 3;

    if (!this.props.onItemClick) return null; // Do nothing if no click handler
    if (colId === 1) return null; // Do nothing if clicking the checkbox
    if (colId === menuColId) return null; // Do nothing if clicking the menu

    return this.props.onItemClick(this.props.items[rowId]);
  };

  // We don't want selected items to persist between pages
  handleNextPage: NoArgsNoReturn = () => {
    this.toggleAll(true);
    this.props.nextPage();
  };
  handlePreviousPage: NoArgsNoReturn = () => {
    this.toggleAll(true);
    this.props.previousPage();
  };

  onSearch: OnSearch = (event) => {
    this.props.handleSearch(event.target.value);
  };

  handleDelete: NoArgsNoReturn = () => {
    if (this.props.handleDelete) {
      // We have to filter out the ones that are being tracked but currently aren't selected.
      const validSelections = this.state.selections
        .filter(isSelected => Boolean(isSelected))
        .map((_, idx) => this.props.items[idx]);

      this.props.handleDelete(validSelections);
      this.toggleAll(true);
    }
  };

  displayColumn: DisplayColumn = (column) => {
    if (this.state.viewSize !== undefined && typeof column[this.state.viewSize] === 'boolean') {
      return column[this.state.viewSize];
    }
    if (this.columnMap.has(column.label)) return this.columnMap.get(column.label);
    if (this.state.viewSize !== undefined) {
      const currentPriority = priorities.indexOf(this.state.viewSize);
      for (const size of priorities.slice(currentPriority)) {
        if (typeof size === 'number' && typeof column[size] === 'boolean') {
          this.columnMap.set(column.label, column[size]);
          return column[size];
        }
      }
    }
    this.columnMap.set(column.label, true);
    return true;
  }

  displayAvatar: DisplayAvatar = () => this.displayColumn({ sm: false });

  render() {
    // Search should be optional component. If no relevant props, dont show it
    let optionalSearch;
    if (this.props.handleSearch) {
      optionalSearch = (
        <Search
          tableName={this.props.tableName || ''}
          onSearch={this.onSearch} />
      );
    }

    return (
      <div className={this.props.containerClass} style={this.props.containerStyle}>
        {optionalSearch}
        <Paper zDepth={2}>
          <ActionBar
            itemSelectedCount={this.state.countSelected}
            filters={this.props.filters}
            handleDelete={this.handleDelete}
            handleFilter={this.props.handleFilter} />
          <Table
            onCellClick={this.handleRowClick}
            multiSelectable>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={styles.checkboxColumn}>
                  <Checkbox
                    checked={this.state.allSelected}
                    onCheck={this.handleSelectAll} />
                </TableHeaderColumn>
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
            <TableBody showRowHover style={styles.tableBody} displayRowCheckbox={false}>
              {this.props.items.map((item, tableIdx) => (
                <TableRow key={item[this.props.itemUniqueId]}>
                  <TableRowColumn style={styles.checkboxColumn}>
                    <Checkbox
                      data-key={tableIdx}
                      checked={this.state.selections[tableIdx]}
                      onCheck={this.handleSelect} />
                  </TableRowColumn>
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
                    if (columnValue && column.format) {
                      columnValue = column.format(columnValue, item);
                    }
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
