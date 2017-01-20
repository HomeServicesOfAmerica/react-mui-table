import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import IconButton from 'material-ui/IconButton';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

import prefixer from '../prefixer';
import RowsPerPage from './RowsPerPage';

const styles = prefixer.prefix({
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: 12,
    fontWeight: 400,
    color: 'rgba(0, 0, 0, .54)',
  },
});

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
      rows,
      paginationText,
      changeRowsPerPage,
     } = this.props;

    return (
      <div style={styles.wrapper}>
        <RowsPerPage
          paginationText={paginationText}
          changeRowsPerPage={changeRowsPerPage}
          rows={rows} />

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
    );
  }
}

export default Pagination;
