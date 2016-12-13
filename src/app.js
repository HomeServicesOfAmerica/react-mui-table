import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Table from './components/table';

// TODO:
// conditionally accepts an array of data for table header
// required to accept an array of data for table body
// able to define pagination
// styled appropriately
// able to define # of records to show per page
// sorting && filter TBD
// able to fulfill parameters based on Mui Table Options


// Render for local dev validation
render (
	<MuiThemeProvider>
		<Table />
	</MuiThemeProvider>,
	document.getElementById('app')
);
