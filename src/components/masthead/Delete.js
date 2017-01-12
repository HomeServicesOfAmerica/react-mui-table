import React from 'react';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

const styles = {
  deleteBar: {
    color: '#03a9f4',
    backgroundColor: 'rgba(3, 169, 244, 0.12)',
    padding: '23px 0 23px 24px',
    fontSize: 14,
    fontWeight: '500',
    borderBottom: '1px solid rgb(224, 224, 224)',
  },
  iconStyle: {
    float: 'right',
    position: 'relative',
    top: -6,
    right: 19,
    color: 'rgba(0, 0, 0, 0.54)',
  },
};

const Delete = ({ itemSelectedCount, handleDelete }) =>
  <div style={styles.deleteBar}>
    {`${itemSelectedCount} item${itemSelectedCount <= 1 ? '' : 's'} selected`}
    <DeleteIcon
      style={styles.iconStyle}
      onClick={handleDelete} />
  </div>;

export default Delete;
