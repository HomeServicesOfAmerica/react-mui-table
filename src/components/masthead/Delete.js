import React, { PureComponent } from 'react';
import { ListItem } from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class Delete extends PureComponent {
  render() {
    return (
      <ListItem>
        Delete
        <DeleteIcon
          onClick={this.props.handleDelete.bind(null, this.props.itemsSelected)} />
      </ListItem>
    );
  }
}

export default Delete;
