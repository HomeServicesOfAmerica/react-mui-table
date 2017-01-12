import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import { darkBlack, faintBlack } from 'material-ui/styles/colors';

const styles = {
  filterBar: {
    cursor: 'pointer',
    padding: '13px 0 13px 6px',
    color: '#03a9f4',
    fontSize: 14,
    fontWeight: '500',
  },
  filterOptions: {
    paddingLeft: 16,
    paddingBottom: 10,
    color: 'rgba(0, 0, 0, 0.870588)',
    fontSize: 14,
    fontWeight: '400',
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
    marginBottom: 10,
  },
  floatClear: {
    display: 'block',
    clear: 'both',
  },
  header: {
    margin: '20px 0',
    color: darkBlack,
    fontSize: 14,
    fontWeight: 600,
  },
  checkboxColumn: {
    float: 'left',
    marginRight: 48,
  },
  container: {
    borderBottom: `1px solid ${faintBlack}`,
  },
};

const chunkArray = original => original.reduce((accumulator, current) => {
  let pushed = false;
  for (const col of accumulator) {
    if (col.length < 4) {
      col.push(current);
      pushed = true;
    }
  }
  if (!pushed) accumulator.push([current]);
  return accumulator;
}, [[]]);

class Filter extends Component {
  state = {
    opsVisible: false,
  };

  getCheckedOptions = label => Array.prototype.slice.call(
    document.querySelectorAll(`[data-key="${label}"]:checked`)
  );

  updateFilter = (event) => {
    const label = event.target.dataset.key;
    const options = this.getCheckedOptions(label).map(element => element.dataset.value);
    this.props.handleFilter(label, options);
  };

  toggleVisibility = () => this.setState({ opsVisible: !this.state.opsVisible });

  render() {
    const { filters } = this.props;

    return (
      <div style={styles.container}>
        <div
          style={styles.filterBar}
          onClick={this.toggleVisibility}>
          <FlatButton
            label='filter'
            primary />
        </div>
        {this.state.opsVisible && (
          <div style={styles.filterOptions}>
            {filters.map(col => (
              <div style={styles.checkboxColumn}>
                <h4 style={styles.header}>{col.label}</h4>
                {chunkArray(col.options).map(optionArray => (
                  <div style={styles.checkboxColumn}>
                    {optionArray.map(option => (
                      <Checkbox
                        style={styles.checkbox}
                        key={option}
                        data-key={col.label}
                        data-value={option}
                        label={option}
                        onCheck={this.updateFilter} />
                    ))}
                  </div>
                ))}
              </div>
            ))}
            <span style={styles.floatClear} />
          </div>
        )}
      </div>
    );
  }
}

export default Filter;
