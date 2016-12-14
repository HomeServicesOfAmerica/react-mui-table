import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  rowsPerPage: {
    float: 'right',
  }
});

class RowsPerPage extends Component {
  render() {
    return (
      <div className={css(styles.rowsPerPage)}>
        Rows per page:
      </div>
    );
  }
}

export default RowsPerPage;
