import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';

import chunkArray from '../../helpers/chunkArray';

const styles = {
  filterBar: {
    cursor: 'pointer',
    padding: '13px 0 13px 0',
    color: '#03a9f4',
    fontSize: 14,
    fontWeight: '500',
    borderBottom: '1px solid rgb(224, 224, 224)',
  },
  filterOptions: {
    paddingLeft: 16,
    color: 'rgba(0, 0, 0, 0.870588)',
    fontSize: 14,
    fontWeight: '400',
    borderBottom: '1px solid rgb(224, 224, 224)',
  },
  optionListWrapper: {
    listStyleType: 'none',
    float: 'left',
    padding: '0',
  },
  optionListItem: {
    paddingBottom: 5,
  },
  checkbox: {
    display: 'inline-block',
    width: 'auto',
    bottom: -5,
    right: -4,
  },
  floatClear: {
    display: 'block',
    clear: 'both',
  },
};

class Filter extends Component {
  state = {
    opsVisible: false,
    ...this.props.filters.reduce((acc, filter) => {
      acc[filter.label] = [];
      return acc;
    }, {}),
  };

  componentWillReceiveProps(nextProps) {
    // Make sure filter configs are in state
    nextProps.filters.forEach((filter) => {
      if (this.state[filter.label] === undefined) {
        this.setState({ [filter.label]: [] });
      }
    });
  }

  updateFilter = (label, option, active) => {
    const currentLabelFilter = this.state[label];
    let newLabelFilter;
    if (active) {
      newLabelFilter = [...currentLabelFilter, option];
    } else {
      newLabelFilter = currentLabelFilter.filter(cur => cur !== option);
    }

    if (newLabelFilter.length === 0) newLabelFilter = null;

    this.setState({ [label]: newLabelFilter || [] });
    this.props.handleFilter(label, newLabelFilter);
  }

  toggleVisibility = () => this.setState({ opsVisible: !this.state.opsVisible });

  render() {
    const { filters } = this.props;
    const filterColumns = chunkArray(filters, 4);

    return (
      <span>
        <div
          style={styles.filterBar}
          onClick={this.toggleVisibility}>
          <FlatButton
            label='filter'
            primary />
        </div>
        <div
          style={{ ...styles.filterOptions, display: this.state.opsVisible ? 'block' : 'none' }}>
          {filterColumns.map((col, i) =>
            <ul
              key={i}
              style={styles.optionListWrapper}>
              {col.map((option, j) =>
                <li
                  key={j}
                  style={styles.optionListItem}>
                  <h4> {option.label} </h4>
                  {option.options.map((opt, k) => (
                    <Checkbox
                      key={k}
                      style={styles.checkbox}
                      label={opt}
                      onCheck={(evt, checked) => this.updateFilter(option.label, opt, checked)} />
                  ))}
                </li>
              )}
            </ul>
          )}
          <span style={styles.floatClear} />
        </div>
      </span>
    );
  }
}

export default Filter;
