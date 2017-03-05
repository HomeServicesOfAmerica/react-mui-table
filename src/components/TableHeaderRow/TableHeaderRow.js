// @flow
import React from 'react';
import {
  TableRow,
  TableHeaderColumn,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

import SortableTableHeaderColumn from '../SortableTableHeaderColumn';
import styles from '../MaterialTable/styles';
import type { TableHeaderRowProps } from './types';

const TableHeaderRow = ({
  allSelected,
  handleSort,
  currentSort,
  avatar,
  columns,
  handleSelectAll,
  displayAvatar,
  displayColumn,
  sortEnabled,
  actionsEnabled,
}: TableHeaderRowProps) => (
  <TableRow>
    <TableHeaderColumn style={styles.checkboxColumn}>
      <Checkbox
        checked={allSelected}
        onCheck={handleSelectAll} />
    </TableHeaderColumn>
    {avatar && displayAvatar() && (
      <TableHeaderColumn style={styles.smallColumn} />
    )}
    {columns.map((column) => {
      if (!displayColumn(column)) return null;
      return (
        <SortableTableHeaderColumn
          fieldKey={column.key}
          sortEnabled={sortEnabled}
          handleSort={handleSort}
          currentSort={currentSort}
          {...column} />
      );
    })}
    {actionsEnabled && (
      <TableHeaderColumn style={styles.smallColumn} />
    )}
  </TableRow>
);

export default TableHeaderRow;
