// @flow
import React from 'react';
import selectn from 'selectn';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import FallbackIcon from 'material-ui/svg-icons/social/person';
import Checkbox from 'material-ui/Checkbox';

import ActionMenu from '../ActionMenu';
import styles from '../MaterialTable/styles';
import type { TableBodyRowProps } from './types';

const TableBodyRow = (props: TableBodyRowProps) => {
  const {
    actions,
    item,
    itemUniqueId,
    tableIdx,
    avatar,
    columns,
    displayColumn,
    displayAvatar,
    handleSelect,
    selections,
    actionsEnabled,
  } = props;
  return (
    <TableRow {...props}>
      <TableRowColumn style={styles.checkboxColumn}>
        <Checkbox
          data-key={tableIdx}
          checked={selections[tableIdx]}
          onCheck={handleSelect} />
      </TableRowColumn>
      {avatar && displayAvatar() && (
        <TableRowColumn style={styles.smallColumn}>
          <Avatar
            src={selectn(avatar, item)}
            icon={<FallbackIcon />} />
        </TableRowColumn>
      )}
      {columns.map((column) => {
        if (!displayColumn(column)) return null;
        let columnValue = selectn(column.key, item);
        if (column.format) {
          columnValue = column.format(columnValue, item);
        }
        return (
          <TableRowColumn key={column.label} colSpan={column.colSpan}>
            <span>{columnValue || ''}</span>
          </TableRowColumn>
        );
      })}
      {actionsEnabled && (
        <TableRowColumn style={styles.smallColumn}>
          <ActionMenu
            actions={actions}
            item={item}
            itemId={item[itemUniqueId]} />
        </TableRowColumn>
      )}
    </TableRow>
  );
};
export default TableBodyRow;
