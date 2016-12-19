import React from 'react';
import { ListItem } from 'material-ui/List';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

import RowsPerPage from './RowsPerPage';

const Pagination = (props) => {
  const { hasNextPage, hasPreviousPage, numRows } = props;

  return (
    <ListItem>
      <div>
        <RowsPerPage
          changeRowsPerPage={this.props.changeRowsPerPage}
          numRows={numRows} />

        <span>
          <ArrowLeft
            onClick={hasPreviousPage ? this.props.previousPage : ''} />
          <ArrowRight
            onClick={hasNextPage ? this.props.nextPage : ''} />
        </span>
      </div>
    </ListItem>
  );
};

export default Pagination;
