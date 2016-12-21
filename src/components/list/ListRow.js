import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import selectn from 'selectn';
import Checkbox from 'material-ui/Checkbox';

import ListAction from './ListAction';
import ListAvatar from './ListAvatar';

const columnStyles = {
  paddingBottom: '15px',
  paddingRight: '20px',
  display: 'inline-block',
};

// eslint-disable-next-line react/prefer-stateless-function

export default class ListRow extends Component {
  // TODO: Find a way to do this without creating a new function in render
  createItemCheckHandler = item => (event, checked) => {
    if (checked) {
      this.props.checkRow(item);
    } else {
      this.props.uncheckRow(item);
    }
  }

  render() {
    const rowColumns = [];
    const { item, actions, columns, avatar } = this.props;

    if (avatar) {
      rowColumns.push(<ListAvatar key={avatar} avatar={avatar} item={item} />);
    }

    columns.forEach((column) => {
      rowColumns.push(
        <div
          key={`${column.key}`}
          style={columnStyles}>
          {selectn(column.key, item) || ''}
        </div>
      );
    });

    return (
      // Every rerender of the top level component causes each checkbox to loop through all selected
      // items and do a deep equal to determine if the box should be checked.
      // TODO: optimize
      <div>
        <ListItem>
          <Checkbox
            onCheck={this.createItemCheckHandler(item)}
            checked={Boolean(this.props.deepFind(item, this.props.itemsSelected))} />
          {rowColumns}
          <ListAction actions={actions} />
        </ListItem>
        <Divider />
      </div>
    );
  }
}
