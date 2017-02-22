// @flow
import prefixer from '../../util/prefixer';

export const paginationStyles = prefixer.prefix({
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: 12,
    fontWeight: 400,
    color: 'rgba(0, 0, 0, .54)',
  },
});

export const rowsPerPageStyles = prefixer.prefix({
  rowsPerPage: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0 10px',
  },
  dropDownMenu: {
    fontSize: 12,
    fontWeight: '400',
    height: 'auto',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  underlineStyle: {
    border: 'none',
  },
});
