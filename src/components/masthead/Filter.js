import React, { PureComponent } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { ListItem } from 'material-ui/List';

const styles = StyleSheet.create({
  filter: {
    borderBottom: '1px solid rgb(224, 224, 224)',
  },
});

class Filter extends PureComponent {
  render() {
    return (
      <ListItem
        className={css(styles.filter)}
        primaryText='FILTER'
        nestedItems={!this.props.itemsSelected.length ? [
          <ListItem key={1} className={css(styles.filter)}>
            filter options go here
          </ListItem>,
        ] : []} />
    );
  }
}

export default Filter;
