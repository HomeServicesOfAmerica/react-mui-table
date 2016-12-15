import React, { PureComponent } from 'react';
import { Row, Col as Column } from 'react-flexbox-grid';
import { StyleSheet, css } from 'aphrodite';
import { ListItem } from 'material-ui/List';

import ListCheckbox from './ListCheckbox';
import ListAction from './ListAction';

const styles = StyleSheet.create({
  content: {
    paddingBottom: '15px',
  },
});

export default class ListRow extends PureComponent {
  render() {
    const rowColumns = [];
    const { data } = this.props;

    // eslint-disable-next-line guard-for-in
    for (const key in data) {
      rowColumns.push(
        <Column
          key={key}
          className={css(styles.content)}
          xs>
          {data[key]}
        </Column>
      );
    }

    return (
      <ListItem>
        <Row>
          <ListCheckbox />
          {rowColumns}
          <ListAction />
        </Row>
      </ListItem>
    );
  }
}
