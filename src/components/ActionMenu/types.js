// @flow
import type { ActionConfig, ActionHandler } from '../../../flow/common-types';

export type ActionMenuItemProps = {
  text: string,
  toggleMenu: (open: boolean) => void,
  item: ActionConfig,
  handler: ActionHandler,
  icon: React$Element<*>,
}

export type ActionMenuState = {
  open: boolean,
}

export type ActionMenuProps = {
  actions: Array<ActionConfig>,
  item: Object,
  itemId: string,
}

// Internal Methods
export type ToggleOpen = (open: boolean) => void;
export type StopPropogation = (event: CustomSyntheticEvent) => void
