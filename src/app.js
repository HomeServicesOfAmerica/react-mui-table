import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import List from './components/list';

injectTapEventPlugin();

// TODO:
// conditionally accepts an array of data for table header
// required to accept an array of data for table body
// able to define pagination
// styled appropriately
// able to define # of records to show per page
// sorting && filter TBD
// able to fulfill parameters based on Mui Table Options


// Render for local dev validation
render(
	<List />,
	document.getElementById('app')
);
