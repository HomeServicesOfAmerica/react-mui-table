import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import IconButton from 'material-ui/IconButton';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

import RowsPerPage from './RowsPerPage';

const styles = {
  wrapper: {
    padding: '23px 3px 23px 0',
  },
  pagination: {
    float: 'right',
    color: 'rgba(0, 0, 0, .54)',
    fontSize: 12,
    fontWeight: '400',
  },
  caretWrapper: {
    display: 'inline',
    position: 'relative',
    top: -19,
    paddingLeft: 18,
  },
};

class Pagination extends Component {
  shouldComponentUpdate = (nextProps, nextState) =>
    !(isEqual(nextProps, this.props) && isEqual(this.state, nextState))

  runNextPage = () => {
    const { hasNextPage, nextPage } = this.props;
    if (!hasNextPage) return null;
    nextPage();
  };

  runPreviousPage = () => {
    const { hasPreviousPage, previousPage } = this.props;
    if (!hasPreviousPage) return null;
    previousPage();
  };

  render() {
    const {
      hasNextPage,
      hasPreviousPage,
      numRows,
      paginationText,
      changeRowsPerPage,
     } = this.props;

    return (
      <div
        style={styles.wrapper}>
        <div style={styles.pagination}>
          <RowsPerPage
            paginationText={paginationText}
            changeRowsPerPage={changeRowsPerPage}
            numRows={numRows} />

          <div style={styles.caretWrapper}>
            <IconButton
              iconStyle={{ color: hasPreviousPage ? 'rgba(0, 0, 0, .54)' : 'rgba(0, 0, 0, .38)' }}
              onClick={this.runPreviousPage}>
              <ArrowLeft />
            </IconButton>

            <IconButton
              iconStyle={{ color: hasNextPage ? 'rgba(0, 0, 0, .54)' : 'rgba(0, 0, 0, .38)' }}
              onClick={this.runNextPage}>
              <ArrowRight />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

export default Pagination;
