import React from 'react';
import { Col as Column } from 'react-flexbox-grid';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const ListAction = () =>
  <Column
    lg={1}
    md={1}
    sm={1}
    xs={1}>
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
      <MenuItem primaryText='example option one' />
      <MenuItem primaryText='example option two' />
    </IconMenu>
  </Column>;

export default ListAction;
