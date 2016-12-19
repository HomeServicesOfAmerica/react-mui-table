import React, { PureComponent } from 'react';
// import { Row, Col as Column } from 'react-flexbox-grid';
import { ListItem } from 'material-ui/List';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

import RowsPerPage from './RowsPerPage';

class Pagination extends PureComponent {
  render() {
    const { hasNextPage, hasPreviousPage, numRows } = this.props;

    return (
      <ListItem>
        <div>
          <div
            xsOffset={8}
            xs={2}>
            <RowsPerPage
              changeRowsPerPage={this.props.changeRowsPerPage}
              numRows={numRows} />
          </div>

          <div
            xs={2}>
            <ArrowLeft
              onClick={hasPreviousPage ? this.props.previousPage : ''} />
            <ArrowRight
              onClick={hasNextPage ? this.props.nextPage : ''} />
          </div>
        </div>
      </ListItem>
    );
  }
}

export default Pagination;
