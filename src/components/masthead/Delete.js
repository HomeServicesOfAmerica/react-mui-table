import React, { PureComponent } from 'react';
import { Row, Col as Column } from 'react-flexbox-grid';
import { ListItem } from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class Delete extends PureComponent {
  render() {
    return (
      <ListItem>
        Delete
        <DeleteIcon
          onClick={this.props.deleteRecords} />
      </ListItem>
    );
  }
}

export default Delete;
