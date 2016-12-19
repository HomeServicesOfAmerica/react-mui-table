import React, { PureComponent } from 'react';
import { ListItem } from 'material-ui/List';

const styles = {
  borderBottom: '1px solid rgb(224, 224, 224)',
};

class Filter extends PureComponent {
  render() {
    return (
      <ListItem
        style={styles}
        primaryText='FILTER'
        nestedItems={!this.props.itemsSelected.length ? [
          <ListItem key={1} style={styles}>
            filter options go here
          </ListItem>,
        ] : []} />
    );
  }
}

export default Filter;
