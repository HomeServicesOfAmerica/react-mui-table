// @flow
import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';

import type { NoArgsNoReturn } from '../../../flow/common-types';
import type { ActionMenuItemProps } from './types';

export default class ActionMenuItem extends Component {
  props: ActionMenuItemProps
  /**
   * Call the handler defined on the action and pass in
   * the item being manipulated
   */
  handleClick: NoArgsNoReturn = () => {
    this.props.handler(this.props.item);
    this.props.toggleMenu(false);
  }

  render() {
    const { icon, text } = this.props;
    return (
      <MenuItem
        leftIcon={icon}
        onClick={this.handleClick}
        primaryText={text} />
    );
  }
}
