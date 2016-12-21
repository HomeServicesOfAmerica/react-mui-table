import React from 'react';
import { ListItem } from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

const iconStyle = {
  float: 'right',
};

const Delete = ({ itemsSelected, handleDelete }) => (
  <ListItem>
    Items Selected: {itemsSelected.length}
    <DeleteIcon style={iconStyle} onClick={handleDelete(itemsSelected)} />
  </ListItem>
);

export default Delete;
