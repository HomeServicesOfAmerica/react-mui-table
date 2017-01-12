import React, { Component } from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import moment from 'moment';
import PublishIcon from 'material-ui/svg-icons/action/visibility';
import UnpublishIcon from 'material-ui/svg-icons/action/visibility-off';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import List from '../src/components/list/index.js';

injectTapEventPlugin();
//
// Dummy callbacks
//
const hasNextPage = true;
const hasPreviousPage = false;
const paginationText = '1 - 15 of 300';
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
    enabled: true,
    icon: <DeleteIcon />,
  },
  {
    text: 'Publish',
    action: 'publish',
    handler: () => {console.log('publish ran');},
    enabled: item => item.status !== 'unpublished',
    icon: <PublishIcon />,
  },
  {
    text: 'Unpublish',
    action: 'unpublish',
    handler: () => {console.log('unpublish ran');},
    enabled: item => item.status !== 'published',
    icon: <UnpublishIcon />,
  },
  {
    text: 'Edit',
    action: 'edit',
    handler: handleRouting,
    enabled: true,
    icon: <EditIcon />,
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
  {
    label: 'Important Date',
    key: 'date',
    sortable: false,
    filterable: false,
    format: date => date.format('DD.MM.YYYY'),
  },
];

const items = [
  {
    firstName: 'ragnar',
    lastName: 'lodbrok',
    email: 'ragnar.lodbrok@gmail.com',
    status: 'published',
    date: moment(),
  },
  {
    firstName: 'rachael',
    lastName: 'ray',
    email: 'rachael.ray@gmail.com',
    status: 'published',
    date: moment(),
  },
  {
    firstName: 'guy',
    lastName: 'fieri',
    email: 'dinersdriveinsandlols@gmail.com',
    status: 'unpublished',
    avatar: '',
    date: moment(),
  },
];

class Wrapper extends Component {
  state = {
    rows: 15,
  };

  changeRowsPerPage = (rows) => {
    this.setState({ rows });
    console.log('changeRowsPerPage ran', rows);
  };

  render() {
    return (
      <List
        avatar={avatar}
        tableName={tableName}
        items={items}
        columns={columns}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        paginationText={paginationText}
        changeRowsPerPage={this.changeRowsPerPage}
        nextPage={nextPage}
        previousPage={previousPage}
        handleDelete={handleDelete}
        actions={actions}
        handleFilter={handleFilter}
        handleSort={handleSort}
        handleSearch={handleSearch}
        filters={filters}
        rows={this.state.rows}
        containerStyle={{ padding: 96 }}
        sortOptions={sortOptions} />
    );
  }
}

render(
  <Wrapper />,
  document.getElementById('app')
);
