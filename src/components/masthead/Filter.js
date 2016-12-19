import React, { PureComponent } from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

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
            {this.props.filters.map((fil, i) =>
              <div key={i}>
                <Checkbox onClick={fil.handler} />
                {fil.label}
              </div>
            )}
          </ListItem>,
        ] : []} />
    );
  }
}

export default Filter;
