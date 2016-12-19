import React, { PureComponent } from 'react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import selectn from 'selectn';

import ListCheckbox from './ListCheckbox';
import ListAction from './ListAction';
import ListAvatar from './ListAvatar';

const styles = {
  paddingBottom: '15px',
  paddingRight: '20px',
  display: 'inline-block',
};

// eslint-disable-next-line react/prefer-stateless-function
export default class ListRow extends PureComponent {
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
          style={styles}>
          {selectn(column.key, item) || ''}
        </div>
      );
    });

    return (
      <div>
        <ListItem>
          <ListCheckbox />
          {rowColumns}
          <ListAction actions={actions} />
        </ListItem>
        <Divider />
      </div>
    );
  }
}
