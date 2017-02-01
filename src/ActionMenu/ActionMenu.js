import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { lightBlack } from 'material-ui/styles/colors';
import ActionMenuItem from './ActionMenuItem';

class ActionMenu extends Component {
  state = {
    open: false,
  };

  toggleOpen = open => this.setState({ open });
  stopPropagation = event => event.stopPropagation();

  render() {
    const { actions, item, itemId } = this.props;
    return (
      <IconMenu
        open={this.state.open}
        onRequestChange={this.toggleOpen}
        useLayerForClickAway
        onClick={this.stopPropagation}
        iconButtonElement={<IconButton><MoreVertIcon color={lightBlack} /></IconButton>}>
        {actions.map((action) => {
          let enabled = typeof action.enabled === 'boolean' ? action.enabled : true;
          if (typeof action.enabled === 'function') enabled = action.enabled(item);
          if (!enabled) return null;
          return (
            <ActionMenuItem
              key={`${action.text}-${itemId}`}
              item={item}
              icon={action.icon}
              handler={action.handler}
              toggleMenu={this.toggleOpen}
              text={action.text} />
          );
        })}
      </IconMenu>
    );
  }
}

export default ActionMenu;
