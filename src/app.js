import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import List from '../dist/bundle';

injectTapEventPlugin();

render(
  <List />,
  document.getElementById('app')
);
