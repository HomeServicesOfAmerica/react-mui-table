// @flow
import type {
  ColumnConfig,
  ActionConfig,
  Avatar,
} from '../../../flow/common-types';
import type {
  HandleSelect,
  DisplayAvatar,
  DisplayColumn,
} from '../MaterialTable/types';

export type TableBodyRowProps = {
  actions: Array<ActionConfig>,
  item: Object,
  itemUniqueId: string,
  tableIdx: number,
  avatar: Avatar,
  columns: Array<ColumnConfig>,
  displayColumn: DisplayColumn,
  displayAvatar: DisplayAvatar,
  handleSelect: HandleSelect,
  selections: Array<boolean>,
  actionsEnabled: boolean,
};

export type GetAvatarSrc = (avatar: Avatar, item: Object) => string|void;
