import React, { PureComponent } from 'react';
// import { Row, Col as Column } from 'react-flexbox-grid';
import selectn from 'selectn';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import ListCheckbox from './ListCheckbox';
import ListAction from './ListAction';
// import ListAvatar from './ListAvatar';

const styles = {
  paddingBottom: '15px',
};

// eslint-disable-next-line react/prefer-stateless-function
export default class ListRow extends PureComponent {
  render() {
    const rowColumns = [];
    // const { item, actions, avatar } = this.props;
    const item = selectn('item.props', this);

    for (let i = 0; i < Object.keys(item); i++) {
      for (const key in item) {
        rowColumns.push(
          <div
            key={i}
            styles={styles}
            xs>
            {item[key]}
          </div>
        );
      }
    }

    return (
      <span>
        <ListItem>
          <div>
            <ListCheckbox />
            {rowColumns}
            <ListAction />
          </div>
        </ListItem>
        <Divider />
      </span>
    );
  }
}
