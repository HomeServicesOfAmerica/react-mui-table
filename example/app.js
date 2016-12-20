import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import List from '../dist/components/list/index.js';

injectTapEventPlugin();
//
// Dummy callbacks
//
const hasNextPage = true;
const hasPreviousPage = false;
const paginationText = '1 - 15 of 300';
const changeRowsPerPage = (...args) => console.log('changeRowsPerPage ran', ...args);
const nextPage = (...args) => console.log('nextPage ran', ...args);
const previousPage = (...args) => console.log('previousPage ran', ...args);
const handleRouting = (...args) => console.log('handleRouting ran', ...args);
const handleDelete = id => console.log('handleDelete ran: ', id);
const handleFilter = (...args) => console.log('handleFilter ran', ...args);
const handleSort = (...args) => console.log(...args);
const handleSearch = (...args) => console.log('handleSearch ran', ...args);

//
// Dummy data
//
const tableName = 'Test List';

const avatar = 'profilePhoto.sizes.small.src';

const actions = [
  {
    text: 'Delete',
    action: 'delete',
    handler: handleDelete,
    icon: 'Trashcan',
  }, {
    text: 'Edit',
    action: 'edit',
    handler: handleRouting,
    icon: 'Edit',
  },
];

const filters = [
  {
    label: 'role',
    options: ['test', 'tester', 'hu', 'demo'],
  },
  {
    label: 'something else',
    options: ['yippie', 'kay', 'yay', 'm'],
  },
];

const sortOptions = [{
  label: 'first name',
  options: [null, 'ASC', 'DESC'],
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
    label: 'Email',
    key: 'email',
    sortable: true,
    filterable: true,
  },
];

const items = [
  {
    firstName: 'ragnar',
    lastName: 'lodbrok',
    email: 'ragnar.lodbrok@gmail.com',
  },
  {
    firstName: 'rachael',
    lastName: 'ray',
    email: 'rachael.ray@gmail.com',
  },
  {
    firstName: 'guy',
    lastName: 'fieri',
    email: 'dinersdriveinsandlols@gmail.com',
    avatar: '',
  },
];

const Wrapper = () => (
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
    filters={filters}
    sortOptions={sortOptions} />
);

render(
  <Wrapper />,
  document.getElementById('app')
);
