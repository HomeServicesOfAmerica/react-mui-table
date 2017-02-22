// @flow
import React from 'react';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import { deleteStyles } from './styles';
import type { DeleteProps } from './types';

const Delete = ({ itemSelectedCount, handleDelete }: DeleteProps) => (
  <div style={deleteStyles.deleteBar}>
    {`${itemSelectedCount} item${itemSelectedCount <= 1 ? '' : 's'} selected`}
    <DeleteIcon
      style={deleteStyles.iconStyle}
      onClick={handleDelete} />
  </div>
);

export default Delete;
