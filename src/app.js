import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MaterialTable from './table';

render(
	<MuiThemeProvider>
		<MaterialTable />
	</MuiThemeProvider>,
	document.getElementById('app')
);
