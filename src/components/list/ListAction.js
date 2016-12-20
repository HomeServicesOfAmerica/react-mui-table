import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const styles = {
  position: 'relative',
  float: 'right',
  maxHeight: 16,
};

// TODO: figure out how to handle conditional icons for MenuItem leftIcon option
const ListAction = ({ actions, avatar }) =>
  <IconMenu
    style={{ ...styles, top: avatar ? -2 : -10 }}
    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
    {actions.map((action, i) =>
      <MenuItem
        key={i}
        primaryText={action.text} />
    )}
  </IconMenu>;

export default ListAction;
