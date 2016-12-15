import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { ListItem } from 'material-ui/List';

import Delete from './Delete';
import Filter from './Filter';

const styles = StyleSheet.create({
  masthead: {
    borderBottom: '1px solid rgb(224, 224, 224)',
  },
});

const Masthead = props =>
  <ListItem className={css(styles.masthead)}>
    {props.itemsSelected.length ? <Delete /> : <Filter itemsSelected={props.itemsSelected} />}
  </ListItem>;

export default Masthead;
