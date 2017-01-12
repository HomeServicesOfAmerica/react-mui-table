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

const ListAction = ({ actions, avatar, item }) =>
  <IconMenu
    style={{ ...styles, top: avatar ? -2 : -10 }}
    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
    {actions.map((action, i) => {
      const enabled = typeof action.enabled === 'function' ? action.enabled(item) : action.enabled;

      if (enabled) {
        return (
          <MenuItem
            key={i}
            leftIcon={action.icon}
            onClick={action.handler}
            primaryText={action.text} />
        );
      }
    })}
  </IconMenu>;

export default ListAction;
