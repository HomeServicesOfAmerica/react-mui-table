import React, { Component } from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import moment from 'moment';
import PublishIcon from 'material-ui/svg-icons/action/visibility';
import UnpublishIcon from 'material-ui/svg-icons/action/visibility-off';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Table from '../src/MaterialTable.js';

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
const handleDelete = (...args) => console.log('handleDelete ran: ', ...args);
const handleFilter = (...args) => console.log('handleFilter ran', ...args);
const handleSearch = (...args) => console.log('handleSearch ran', ...args);
const onItemClick = item => console.log(`clicked: ${item.firstName} ${item.lastName}`);


//
// Dummy data
//
const tableName = 'Test List';

const avatar = 'img';

const filters = [
  {
    label: 'role',
    key: 'role',
    options: ['test', 'tester', 'hu', 'demo', 'two', 'column', 'test'],
  },
  {
    label: 'something else',
    key: 'something.else',
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
    sm: false,
  },
  {
    label: 'Email',
    key: 'email',
    sortable: true,
    filterable: true,
    colSpan: 2,
  },
  {
    label: 'Important Date',
    key: 'date',
    sortable: false,
    filterable: false,
    lg: true,
    xl: false,
    tooltip: 'Haha this is not really important',
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
    id: 1,
  },
  {
    firstName: 'rachael',
    lastName: 'ray',
    email: 'rachael.ray@gmail.com',
    status: 'published',
    date: moment(),
    img: 'https://pbs.twimg.com/profile_images/419136331587919872/NQDabAD5_400x400.jpeg',
    id: 2,
  },
  {
    firstName: 'guy',
    lastName: 'fieri',
    email: 'dinersdriveinsandlols@gmail.com',
    status: 'unpublished',
    avatar: '',
    date: moment(),
    id: 3,
  },
];

class Wrapper extends Component {
  state = {
    rows: 15,
    items,
    currentSort: {},
  };


  actions = [
    {
      text: 'Delete',
      action: 'delete',
      handler: target => this.setState({
        items: this.state.items.filter(item => item.id !== target.id),
      }),
      enabled: true,
      icon: <DeleteIcon />,
    },
    {
      text: 'Publish',
      action: 'publish',
      handler: (target) => {
        const newItems = this.state.items.map((item) => {
          if (item.id === target.id) item.status = 'published';
          return item;
        });
        this.setState({ items: newItems });
      },
      enabled: item => item.status === 'unpublished',
      icon: <PublishIcon />,
    },
    {
      text: 'Unpublish',
      action: 'unpublish',
      handler: (target) => {
        const newItems = this.state.items.map((item) => {
          if (item.id === target.id) item.status = 'unpublished';
          return item;
        });
        this.setState({ items: newItems });
      },
      enabled: item => item.status === 'published',
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

  changeRowsPerPage = (rows) => {
    this.setState({ rows });
  };

  handleSort = (label, direction, key) => {
    this.setState({
      currentSort: {
        label,
        direction,
      },
      items: this.state.items.sort((a, b) => {
        if (a[key] > b[key]) return direction === 'ASC' ? 1 : -1;
        if (a[key] < b[key]) return direction === 'ASC' ? -1 : 1;
        return 0;
      }),
    });
  };

  render() {
    return (
      <div>
        <h1> Without Avatar </h1>
        <MuiThemeProvider>
          <Table
            tableName={tableName}
            itemUniqueId={'id'}
            items={this.state.items}
            columns={columns}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            nextPage={nextPage}
            previousPage={previousPage}
            paginationText={paginationText}
            changeRowsPerPage={this.changeRowsPerPage}
            nextPage={nextPage}
            previousPage={previousPage}
            handleDelete={handleDelete}
            actions={this.actions}
            handleFilter={handleFilter}
            handleSort={this.handleSort}
            handleSearch={handleSearch}
            currentSort={this.state.currentSort}
            filters={filters}
            onItemClick={onItemClick}
            rows={this.state.rows}
            containerStyle={{ padding: 96 }}
            sortOptions={sortOptions} />
        </MuiThemeProvider>
        <h1> With Avatar </h1>
        <MuiThemeProvider>
          <Table
            avatar={avatar}
            tableName={tableName}
            itemUniqueId={'id'}
            items={this.state.items}
            columns={columns}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            nextPage={nextPage}
            previousPage={previousPage}
            paginationText={paginationText}
            changeRowsPerPage={this.changeRowsPerPage}
            nextPage={nextPage}
            previousPage={previousPage}
            handleDelete={handleDelete}
            actions={this.actions}
            handleFilter={handleFilter}
            handleSort={this.handleSort}
            handleSearch={handleSearch}
            currentSort={this.state.currentSort}
            filters={filters}
            onItemClick={onItemClick}
            rows={this.state.rows}
            containerStyle={{ padding: 96 }}
            sortOptions={sortOptions} />
        </MuiThemeProvider>
        <h1> Without Filters </h1>
        <MuiThemeProvider>
          <Table
            avatar={avatar}
            tableName={tableName}
            itemUniqueId={'id'}
            items={this.state.items}
            columns={columns}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            nextPage={nextPage}
            previousPage={previousPage}
            paginationText={paginationText}
            changeRowsPerPage={this.changeRowsPerPage}
            nextPage={nextPage}
            previousPage={previousPage}
            handleDelete={handleDelete}
            actions={this.actions}
            handleFilter={handleFilter}
            handleSort={this.handleSort}
            handleSearch={handleSearch}
            currentSort={this.state.currentSort}
            onItemClick={onItemClick}
            rows={this.state.rows}
            containerStyle={{ padding: 96 }}
            sortOptions={sortOptions} />
        </MuiThemeProvider>

        <h1> Without Pagination </h1>
        <MuiThemeProvider>
          <Table
            avatar={avatar}
            tableName={tableName}
            itemUniqueId={'id'}
            items={this.state.items}
            columns={columns}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            paginationText={paginationText}
            changeRowsPerPage={this.changeRowsPerPage}
            handleDelete={handleDelete}
            actions={this.actions}
            handleFilter={handleFilter}
            handleSort={this.handleSort}
            handleSearch={handleSearch}
            currentSort={this.state.currentSort}
            onItemClick={onItemClick}
            rows={this.state.rows}
            containerStyle={{ padding: 96 }}
            sortOptions={sortOptions} />
        </MuiThemeProvider>

        <h1> Without Sorting </h1>
        <MuiThemeProvider>
          <Table
            avatar={avatar}
            tableName={tableName}
            itemUniqueId={'id'}
            items={this.state.items}
            columns={columns}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            nextPage={nextPage}
            previousPage={previousPage}
            paginationText={paginationText}
            changeRowsPerPage={this.changeRowsPerPage}
            handleDelete={handleDelete}
            actions={this.actions}
            handleFilter={handleFilter}
            handleSearch={handleSearch}
            currentSort={this.state.currentSort}
            onItemClick={onItemClick}
            rows={this.state.rows}
            containerStyle={{ padding: 96 }}
            sortOptions={sortOptions} />
        </MuiThemeProvider>

        <h1> Without Actions </h1>
        <MuiThemeProvider>
          <Table
            avatar={avatar}
            tableName={tableName}
            itemUniqueId={'id'}
            items={this.state.items}
            columns={columns}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            nextPage={nextPage}
            previousPage={previousPage}
            paginationText={paginationText}
            changeRowsPerPage={this.changeRowsPerPage}
            handleDelete={handleDelete}
            handleFilter={handleFilter}
            handleSearch={handleSearch}
            currentSort={this.state.currentSort}
            onItemClick={onItemClick}
            rows={this.state.rows}
            containerStyle={{ padding: 96 }}
            sortOptions={sortOptions} />
        </MuiThemeProvider>

        <h1> Without Delete </h1>
        <MuiThemeProvider>
          <Table
            avatar={avatar}
            tableName={tableName}
            itemUniqueId={'id'}
            items={this.state.items}
            columns={columns}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            nextPage={nextPage}
            previousPage={previousPage}
            paginationText={paginationText}
            changeRowsPerPage={this.changeRowsPerPage}
            handleFilter={handleFilter}
            handleSearch={handleSearch}
            currentSort={this.state.currentSort}
            onItemClick={onItemClick}
            rows={this.state.rows}
            containerStyle={{ padding: 96 }}
            sortOptions={sortOptions} />
        </MuiThemeProvider>

        <h1> Without RowsPerPage </h1>
        <MuiThemeProvider>
          <Table
            avatar={avatar}
            tableName={tableName}
            itemUniqueId={'id'}
            items={this.state.items}
            columns={columns}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            nextPage={nextPage}
            previousPage={previousPage}
            paginationText={paginationText}
            handleDelete={handleDelete}
            handleFilter={handleFilter}
            handleSearch={handleSearch}
            currentSort={this.state.currentSort}
            onItemClick={onItemClick}
            rows={this.state.rows}
            containerStyle={{ padding: 96 }}
            sortOptions={sortOptions} />
        </MuiThemeProvider>

        <h1> With Custom Row Options </h1>
        <MuiThemeProvider>
          <Table
            avatar={avatar}
            tableName={tableName}
            itemUniqueId={'id'}
            items={this.state.items}
            columns={columns}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            nextPage={nextPage}
            previousPage={previousPage}
            paginationText={paginationText}
            handleDelete={handleDelete}
            handleFilter={handleFilter}
            handleSearch={handleSearch}
            currentSort={this.state.currentSort}
            onItemClick={onItemClick}
            rows={this.state.rows}
            changeRowsPerPage={this.changeRowsPerPage}
            rowOptions={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
            containerStyle={{ padding: 96 }}
            sortOptions={sortOptions} />
        </MuiThemeProvider>
      </div>
    );
  }
}

render(
  <Wrapper />,
  document.getElementById('app')
);
