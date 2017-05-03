// @flow
import type {
  ColumnConfig,
  ActionConfig,
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
  avatar: string,
  columns: Array<ColumnConfig>,
  displayColumn: DisplayColumn,
  displayAvatar: DisplayAvatar,
  handleSelect: HandleSelect,
  selections: Array<boolean>,
  actionsEnabled: boolean,
};

type GetImageSrc = (item: Object) => string|void;
export type GetAvatarSrc = (avatar: GetImageSrc|string, item: Object) => string|void;
