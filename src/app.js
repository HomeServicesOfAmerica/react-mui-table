import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import List from '../dist/list/index.js';

injectTapEventPlugin();

const tableName = 'Test List';

const items = [
  {
    firstName: 'bob',
    lastName: 'ross',
    profilePhoto: {
      sizes: {
        small: {
          src: 'URL',
        }
      }
    },
    adfgsdfg: 'sdafsd',
  },
  {
    firstName: 'ragnar',
    lastName: 'lodbrok',
  },
  {
    firstName: 'rachael',
    lastName: 'ray',
  },
  {
    firstName: 'guy',
    lastName: 'fieri',
    avatar: '',
  },
];


const avatar = 'profilePhoto.sizes.small.src';

// Pagination props
const hasNextPage = true;
const hasPreviousPage = false;
const paginationText = 'Showing results 1 - 15 of 300';
const changeRowsPerPage = () => { return 'changeRowsPerPage ran' };
const nextPage = () => { return 'nextPage ran' };
const previousPage = () => { return 'previousPage ran' };

const handleRouting = (id) => { return 'handleRouting ran' };
const handleDelete = (id) => { console.log('handleDelete ran: ', id) };

const actions = [{
  text: 'Delete',
  action: 'delete',
  handler: handleDelete,
  icon: 'Trashcan',
}, {
  text: 'Edit',
  action: 'edit',
  handler: handleRouting,
  icon: 'Edit',
}];

const handleFilter = () => { return 'handleFilter ran' };
const handleSort = () => { return 'handleSort ran' };
const handleSearch = () => { console.log('handleSearch ran'); };

const filters = [{
  label: 'role',
  options: [],
  handler: handleFilter,
}];

const columns = [
  {
    label: 'first name',
    key: 'firstName',
    sortable: true,
    filterable: true,
  },
  {
    label: 'last name',
    key: 'lastName',
    sortable: true,
    filterable: true,
  },
  {
    label: 'Photo',
    key: 'photo',
    sortable: true,
    filterable: true,
  },
];

render(
  <List
    avatar={avatar}
    tableName={tableName}
    items={items}
    columns={columns}
    hasNextPage={hasNextPage}
    hasPreviousPage={hasPreviousPage}
    paginationText={paginationText}
    changeRowsPerPage={changeRowsPerPage}
    nextPage={nextPage}
    previousPage={previousPage}
    handleDelete={handleDelete}
    actions={actions}
    handleFilter={handleFilter}
    handleSort={handleSort}
    handleSearch={handleSearch}
    filters={filters} />,
  document.getElementById('app')
);
