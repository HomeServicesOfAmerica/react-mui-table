// @flow
import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import IconButton from 'material-ui/IconButton';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

import RowsPerPage from './RowsPerPage';
import { paginationStyles } from './styles';
import type { NoArgsNoReturn } from '../../../flow/common-types';
import type { PaginationProps } from './types';

class Pagination extends Component {
  props: PaginationProps

  shouldComponentUpdate = (nextProps: PaginationProps) => !isEqual(nextProps, this.props)

  runNextPage: NoArgsNoReturn = () => {
    const { hasNextPage, nextPage } = this.props;
    if (!hasNextPage) return;
    nextPage();
  };

  runPreviousPage: NoArgsNoReturn = () => {
    const { hasPreviousPage, previousPage } = this.props;
    if (!hasPreviousPage) return;
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
      <div style={paginationStyles.wrapper}>
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
