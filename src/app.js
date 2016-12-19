import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import List from './components/list';

injectTapEventPlugin();

render(
  <List />,
  document.getElementById('app')
);
