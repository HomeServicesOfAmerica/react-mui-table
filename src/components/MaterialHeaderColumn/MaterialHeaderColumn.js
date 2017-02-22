// @flow
import React, { Component } from 'react';
import { TableHeaderColumn } from 'material-ui/Table';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import { darkBlack } from 'material-ui/styles/colors';

import { materialHeaderColumnStyles } from './styles';
import type { NoArgsNoReturn } from '../../../flow/common-types';
import type {
  MaterialHeaderColumnProps,
  ColumnStyle,
  GetSortIcon,
  IsCurrentSort,
  IsSortable,
} from './types';

export default class MaterialHeaderColumn extends Component {
  props: MaterialHeaderColumnProps
  /**
   * Grab the correct directional icon based on
   * currentSort direction.
   */
  getSortIcon: GetSortIcon = () => {
    if (!this.isCurrentSort()) return null;
    let Icon = ArrowDown;
    if (this.props.currentSort.direction === 'ASC') Icon = ArrowUp;
    return <Icon style={materialHeaderColumnStyles.icon} />;
  }

  // Shortcut for a often used boolean check
  isCurrentSort: IsCurrentSort = () => this.props.currentSort.label === this.props.label;

  // Shortcut for a often used boolean check
  isSortable: IsSortable = () => this.props.sortable;

  /**
   * Generates a style object for the current column
   * based on props.
   */
  columnStyle: ColumnStyle = () => {
    const dynamicStyle = {

    };
    if (this.isCurrentSort()) dynamicStyle.color = darkBlack;
    if (this.isSortable()) dynamicStyle.cursor = 'pointer';
    return {
      ...materialHeaderColumnStyles.headerColumn,
      ...dynamicStyle,
    };
  };

  /**
   * quickly toggle the currently sorted column.
   * This approach only allows one column to be sorted at a time.
   */
  toggleSort: NoArgsNoReturn = () => {
    if (!this.isSortable()) return;
    if (this.isCurrentSort()) {
      if (this.props.currentSort.direction === 'ASC') {
        this.props.handleSort(this.props.currentSort.label, 'DESC', this.props.fieldKey);
        return;
      }
      this.props.handleSort(); // Clear sort
      return;
    }
    this.props.handleSort(this.props.label, 'ASC', this.props.fieldKey);
  };

  render() {
    return (
      <TableHeaderColumn
        style={this.columnStyle()}
        onClick={this.toggleSort}
        colSpan={this.props.colSpan}
        tooltip={this.props.tooltip}>
        {this.getSortIcon()}{this.props.label}
      </TableHeaderColumn>
    );
  }
}
