// @flow
import prefixer from '../../util/prefixer';

const unPrefixedSearchStyles: InlineStyles = {
  searchBar: {
    marginBottom: 15,
  },
  icon: {
    width: 21,
    color: 'rgba(0, 0, 0, 0.54)',
    padding: '0 5px 0 21px',
    position: 'relative',
    top: 7,
  },
  input: {
    color: 'rgba(0, 0, 0, .54)',
    fontWeight: '400',
    fontSize: 14,
    width: 'calc(100% - 50px)',
  },
};

export const searchStyles = prefixer.prefix(unPrefixedSearchStyles);
