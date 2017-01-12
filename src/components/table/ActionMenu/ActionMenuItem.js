import React, { PureComponent } from 'react';
import MenuItem from 'material-ui/MenuItem';

export default class ActionMenuItem extends PureComponent {
  /**
   * Call the handler defined on the action and pass in
   * the item being manipulated
   */
  handleClick = () => {
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
