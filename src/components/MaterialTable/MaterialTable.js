// @flow
import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import respondable from 'respondable';
import Paper from 'material-ui/Paper';

import {
  Table,
  TableHeader,
  TableBody,
} from 'material-ui/Table';

import {
  isFilterEnabled,
  isSortEnabled,
  isSearchEnabled,
  isDeleteEnabled,
  areActionsEnabled,
  isPaginationEnabled,
} from '../../util/featureToggles';
import TableHeaderRow from '../TableHeaderRow';
import TableBodyRow from '../TableBodyRow';
import ActionBar from '../ActionBar';
import Pagination from '../Pagination';
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
  state: MaterialTableState = {
    selections: this.props.items.map(() => false),
    countSelected: 0,
    allSelected: false,
    viewSize: undefined,
  };

  columnMap: Map<string, boolean> = new Map();
  destroyRespondable: Function = () => {};
  filterEnabled: boolean = isFilterEnabled(this.props)
  searchEnabled: boolean = isSearchEnabled(this.props)
  sortEnabled: boolean = isSortEnabled(this.props)
  deleteEnabled: boolean = isDeleteEnabled(this.props)
  paginationEnabled: boolean = isPaginationEnabled(this.props)
  actionsEnabled: boolean = areActionsEnabled(this.props)

  componentDidMount() {
    this.destroyRespondable = respondable(breakpointObject, this.handleResize);
  }

  componentWillReceiveProps(nextProps: MaterialTableProps) {
    if (!isEqual(nextProps.columns, this.props.columns)) this.columnMap.clear();

    this.filterEnabled = isFilterEnabled(nextProps);
    this.searchEnabled = isSearchEnabled(nextProps);
    this.sortEnabled = isSortEnabled(nextProps);
    this.deleteEnabled = isDeleteEnabled(nextProps);
    this.actionsEnabled = areActionsEnabled(nextProps);
    this.paginationEnabled = isPaginationEnabled(nextProps);
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
    // $FlowIssue
    if (this.paginationEnabled) this.props.nextPage();
  };
  handlePreviousPage: NoArgsNoReturn = () => {
    this.toggleAll(true);
    // $FlowIssue
    if (this.paginationEnabled) this.props.previousPage();
  };

  onSearch: OnSearch = (event) => {
    const { handleSearch } = this.props;
    // $FlowIssue
    if (this.searchEnabled) handleSearch(event.target.value);
  };

  handleDelete: NoArgsNoReturn = () => {
    if (this.deleteEnabled) {
      // We have to filter out the ones that are being tracked but currently aren't selected.
      const validSelections = this.state.selections
        .filter(isSelected => Boolean(isSelected))
        .map((_, idx) => this.props.items[idx]);

      // $FlowIssue
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
    const {
      containerClass,
      containerStyle,
      tableName,
      filters,
      handleFilter,
      avatar,
      columns,
      handleSort,
      currentSort,
      actions,
      items,
      itemUniqueId,
      hasNextPage,
      hasPreviousPage,
      paginationText,
      changeRowsPerPage,
      rowOptions,
      rows,
    } = this.props;

    return (
      <div className={containerClass} style={containerStyle}>
        {this.searchEnabled && (
          <Search
            tableName={tableName || ''}
            onSearch={this.onSearch} />
        )}
        <Paper zDepth={2}>
          <ActionBar
            itemSelectedCount={this.state.countSelected}
            deleteEnabled={this.deleteEnabled}
            handleDelete={this.handleDelete}
            filterEnabled={this.filterEnabled}
            filters={filters}
            handleFilter={handleFilter} />
          <Table
            onCellClick={this.handleRowClick}
            multiSelectable>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}>
              <TableHeaderRow
                sortEnabled={this.sortEnabled}
                actionsEnabled={this.actionsEnabled}
                allSelected={this.state.allSelected}
                handleSelectAll={this.handleSelectAll}
                handleSort={handleSort}
                currentSort={currentSort}
                columns={columns}
                avatar={avatar}
                displayColumn={this.displayColumn}
                displayAvatar={this.displayAvatar} />
            </TableHeader>
            <TableBody showRowHover style={styles.tableBody} displayRowCheckbox={false}>
              {items.map((item, tableIdx) => (
                <TableBodyRow
                  key={item[itemUniqueId]}
                  actions={actions}
                  item={item}
                  itemUniqueId={itemUniqueId}
                  tableIdx={tableIdx}
                  avatar={avatar}
                  columns={columns}
                  displayColumn={this.displayColumn}
                  displayAvatar={this.displayAvatar}
                  handleSelect={this.handleSelect}
                  selections={this.state.selections}
                  actionsEnabled={this.actionsEnabled} />
              ))}
            </TableBody>
          </Table>
          {this.paginationEnabled && (
            <Pagination
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              paginationText={paginationText}
              changeRowsPerPage={changeRowsPerPage}
              nextPage={this.handleNextPage}
              previousPage={this.handlePreviousPage}
              rowOptions={rowOptions}
              rows={rows} />
          )}
        </Paper>
      </div>
    );
  }
}
