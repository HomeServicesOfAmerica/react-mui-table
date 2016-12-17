import React, { PureComponent } from 'react';
import { Row, Col as Column } from 'react-flexbox-grid';
import { StyleSheet, css } from 'aphrodite';
import selectn from 'selectn';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import ListCheckbox from './ListCheckbox';
import ListAction from './ListAction';
import ListAvatar from './ListAvatar';

const styles = StyleSheet.create({
  content: {
    paddingBottom: '15px',
  },
});

export default class ListRow extends PureComponent {
  render() {
    const rowColumns = [];
    const { item, actions, avatar } = this.props;

    for (let i=0; i<Object.keys(item); i++) {
      for (const key in item) {
        rowColumns.push(
          <Column
            key={i}
            className={css(styles.content)}
            xs>
            {item[key]}
          </Column>
        );
      }
    }

    return (
      <span>
        <ListItem>
          <Row>
            <ListCheckbox />
            {rowColumns}
            <ListAction />
          </Row>
        </ListItem>
        <Divider />
      </span>
    );
  }
}
