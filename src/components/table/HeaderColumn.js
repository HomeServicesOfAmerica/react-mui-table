import React, { PureComponent } from 'react';
import { TableHeaderColumn } from 'material-ui/table';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import { darkBlack } from 'material-ui/styles/colors';

const styles = {
  headerColumn: {
    textTransform: 'uppercase',
    fontWeight: 600,
    fontSize: 12,
    position: 'relative',
  },
  clickable: {
    cursor: 'pointer',
  },
  icon: {
    position: 'absolute',
    left: 0,
    height: 13,
    width: 15,
  },
};

export default class HeaderColumn extends PureComponent {
  /**
   * Grab the correct directional icon based on
   * currentSort direction.
   */
  getSortIcon = () => {
    if (!this.isCurrentSort()) return null;
    let Icon = ArrowDown;
    if (this.props.currentSort.direction === 'ASC') Icon = ArrowUp;
    return <Icon style={styles.icon} />;
  }

  // Shortcut for a often used boolean check
  isCurrentSort = () => this.props.currentSort.label === this.props.label;

  // Shortcut for a often used boolean check
  isSortable = () => this.props.sortable;

  /**
   * Generates a style object for the current column
   * based on props.
   */
  columnStyle = () => {
    const dynamicStyle = {

    };
    if (this.isCurrentSort()) dynamicStyle.color = darkBlack;
    if (this.isSortable()) dynamicStyle.cursor = 'pointer';
    return {
      ...styles.headerColumn,
      ...dynamicStyle,
    };
  };

  /**
   * quickly toggle the currently sorted column.
   * This approach only allows one column to be sorted at a time.
   */
  toggleSort = () => {
    if (!this.isSortable()) return;
    if (this.isCurrentSort()) {
      if (this.props.currentSort.direction === 'ASC') {
        return this.props.handleSort(this.props.currentSort.label, 'DESC', this.props.fieldKey);
      }
      return this.props.handleSort(); // Clear sort
    }
    return this.props.handleSort(this.props.label, 'ASC', this.props.fieldKey);
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
