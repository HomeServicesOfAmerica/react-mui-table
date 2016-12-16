import React, { PureComponent } from 'react';
import { Row, Col as Column } from 'react-flexbox-grid';
import { StyleSheet, css } from 'aphrodite';
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
    const { data, actions } = this.props;

    console.log('actions? ', actions);

    // eslint-disable-next-line guard-for-in
    for (const key in data) {
      if(key!=='avatar') {
        rowColumns.push(
          <Column
            key={key}
            className={css(styles.content)}
            xs>
            {data[key]}
          </Column>
        );
      } else {
        rowColumns.push(
          <Column
            key={key}
            className={css(styles.content)}
            xs>
            <ListAvatar avatar={data[key]} />
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
