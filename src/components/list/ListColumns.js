import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';

const iconStyle = {
  position: 'relative',
  top: 8,
  left: -8,
  width: 16,
};

const generateSortPrefix = (arrayOfPrefix) => {
  if (!(Array.isArray(arrayOfPrefix) && typeof arrayOfPrefix[0] === 'string')) {
    return '';
  }

  if (arrayOfPrefix[0] === 'ASC') {
    return <ArrowUp style={iconStyle} />;
  } else if (arrayOfPrefix[0] === 'DESC') {
    return <ArrowDown style={iconStyle} />;
  }
};

export default class ListColumns extends Component {
  // Create a property in state for each sortOption
  state = {
    ...this.props.sortOptions.reduce((acc, opts) => {
      acc[opts.label] = opts.options;
      return acc;
    }, {}),
  };

  componentWillReceiveProps(nextProps) {
    // Make sure sort configs are in state
    nextProps.sortOptions.forEach((opt) => {
      if (this.state[opt.label] === undefined) {
        this.setState({ [opt.label]: opt.options });
      }
    });
  }

  cycleSortOption = (event) => {
    if (!event.target.getAttribute('data-sortable')) return; // Don't do anything if not sortable.
    const label = event.target.id;
    if (!Array.isArray(this.state[label])) return;
    const slicedArr = this.state[label].slice();
    slicedArr.push(slicedArr.shift());
    this.setState(
      { [label]: slicedArr },
      () => this.props.handleSort(label, this.state[label][0])
    );
  }

  // TODO: Refactor to take function creation out of render method
  render() {
    const { columns, avatar, handleSelectAll } = this.props;
    const styles = {
      wrapper: {
        borderBottom: '1px solid rgb(224, 224, 224)',
        padding: '13px 0 13px 16px',
      },
      column: {
        position: 'relative',
        paddingLeft: 4,
        top: -5,
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: '500',
        display: 'inline-block',
        width: `calc(${Math.floor(100 / (columns.length + 1)).toString()}% - 1em)`,
      },
      checkbox: {
        display: 'inline-block',
        width: 'auto',
        paddingLeft: 4,
      },
    };
    const avatarStyles = avatar ? { paddingRight: 64 } : {};

    return (
      <div style={styles.wrapper}>
        <Checkbox
          style={{ ...styles.checkbox, ...avatarStyles }}
          checked={this.props.selectedAll}
          onCheck={handleSelectAll} />
        {columns.map(column =>
          <div
            key={column.key}
            style={{ ...styles.column, color: generateSortPrefix(this.state[column.label]) ? 'rgba(0, 0, 0, .87)' : 'rgba(0, 0, 0, .54)' }}
            id={column.label}
            data-sortable={column.sortable}
            onClick={this.cycleSortOption}>
            {generateSortPrefix(this.state[column.label])}
            {column.label}
          </div>
        )}
      </div>
    );
  }
}
