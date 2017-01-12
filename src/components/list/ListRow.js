import React, { Component } from 'react';
import selectn from 'selectn';
import Checkbox from 'material-ui/Checkbox';
import ListItem from 'material-ui/List';

import ListAction from './ListAction';
import ListAvatar from './ListAvatar';

export default class ListRow extends Component {
  state = {
    hoverState: false,
  };

  itemCheckHandler = (event, checked) => {
    const { item, checkRow, uncheckRow } = this.props;
    checked ? checkRow(item) : uncheckRow(item);
  }

  toggleHoverState = () => {
    this.setState({ hoverState: !this.state.hoverState });
  }

  render() {
    const rowColumns = [];
    const { item, actions, columns, avatar, deepFind, itemsSelected } = this.props;
    const styles = {
      row: {
        paddingTop: avatar ? 3 : 10,
        paddingBottom: avatar ? 3 : 10,
        paddingLeft: 20,
        borderBottom: '1px solid rgb(224, 224, 224)',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 13,
      },
      column: {
        position: 'relative',
        top: -5,
        wordWrap: 'break-word',
        display: 'inline-block',
        width: `calc(${Math.floor(100 / (columns.length + 1)).toString()}% - 1em)`,
      },
      checkbox: {
        display: 'inline-block',
        width: 'auto',
      },
    };
    const hoverStateStyle = this.state.hoverState ? { backgroundColor: '#eee' } : {};

    // If avatar is available, always positioned first in data columns
    if (avatar) {
      rowColumns.push(
        <ListAvatar
          key={avatar}
          avatar={avatar}
          item={item} />
      );
    }

    // Rest of column data, relevant to the header columns
    columns.forEach((column, i) => {
      // This is to properly space out the remaining columns
      // if an avatar exists, since it has custom width styling
      let customSpacing = {};
      if (!avatar) {
        customSpacing = { paddingLeft: 5 };
      } else if (avatar && i) {
        customSpacing = { paddingLeft: 5 };
      }

      let columnValue = selectn(column.key, item);

      if (columnValue && column.format) columnValue = column.format(columnValue);

      rowColumns.push(
        <div
          key={`${column.key}`}
          style={{ ...customSpacing, ...styles.column }}>
          {columnValue || ''}
        </div>
      );
    });

    return (
      // Every rerender of the top level component causes each checkbox to loop through all selected
      // items and do a deep equal to determine if the box should be checked.
      // TODO: optimize
      <ListItem
        style={{ ...styles.row, ...hoverStateStyle }}
        onMouseEnter={this.toggleHoverState}
        onMouseLeave={this.toggleHoverState}>
        <Checkbox
          style={styles.checkbox}
          onCheck={this.itemCheckHandler}
          checked={Boolean(deepFind(item, itemsSelected))} />
        {rowColumns}
        <ListAction
          item={item}
          avatar={avatar}
          actions={actions} />
      </ListItem>
    );
  }
}
