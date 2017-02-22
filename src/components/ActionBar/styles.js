// @flow
import { darkBlack, faintBlack } from 'material-ui/styles/colors';

export const filterStyles: InlineStyles = {
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

export const deleteStyles: InlineStyles = {
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
