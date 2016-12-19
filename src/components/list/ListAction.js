import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// TODO: figure out how to handle conditional icons for MenuItem leftIcon option
const ListAction = props =>
  <IconMenu
    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
    {props.actions.map((action, i) =>
      <MenuItem
        key={i}
        primaryText={action.text} />
    )}
  </IconMenu>;

export default ListAction;
