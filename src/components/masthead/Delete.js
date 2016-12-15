import React, { PureComponent } from 'react';
import { Row, Col as Column } from 'react-flexbox-grid';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class Delete extends PureComponent {
  render() {
    return (
      <span>
        Delete
        <DeleteIcon />
      </span>
    );
  }
}

export default Delete;
