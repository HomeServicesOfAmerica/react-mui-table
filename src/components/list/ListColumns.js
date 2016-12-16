import React from 'react';
import { Row, Col as Column } from 'react-flexbox-grid';
import { StyleSheet, css } from 'aphrodite';
import { ListItem } from 'material-ui/List';

import ListCheckbox from './ListCheckbox';

const styles = StyleSheet.create({
  content: {
    color: 'rgb(158, 158, 158)',
    textTransform: 'uppercase',
    fontSize: '18px',
    fontWeight: 'normal',
    borderBottom: '1px solid rgb(224, 224, 224)',
  },
});

const ListColumns = props =>
  <ListItem className={css(styles.content)}>
    <Row>
      <ListCheckbox />
      {props.columns.map(column =>
        <Column key={column.key} xs>
          {column.label}
        </Column>
      )}
    </Row>
  </ListItem>;

export default ListColumns;
