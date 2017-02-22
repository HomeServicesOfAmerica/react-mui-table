// @flow

// InlineStyles
declare type InlineStyles = { [key: string]: Object };

// lodash.isEqual
declare module 'lodash.isequal' {
  declare module.exports: (arg1: any, arg2: any) => boolean
}

// Respondable flow typing
type onChangeCb = (
  matches: Array<string|void>,
  priority: string|void,
  ...rest: Array<void>
) => void;
type BoundDestroy = (...rest: Array<void>) => boolean;
type Respondable = (
  breakpoints: Object,
  onChangeCb: onChangeCb,
  priority?: Array<string|void>,
  ...rest: Array<void>
) => BoundDestroy;

declare module 'respondable' {
  declare module.exports: Respondable
}

// Prefixer typing
type Prefixer = (config?: Object) => {
  prefix: (InlineStyles: InlineStyles) => InlineStyles;
}

declare module 'inline-style-prefixer' {
  declare module.exports: Prefixer
}

// MaterialUI Colors

declare module 'material-ui/styles/colors' {
  declare module.exports: {
    faintBlack: string,
    lightBlack: string,
    darkBlack: string,
  }
}

// SyntheticEvent
type CustomSyntheticEventTarget = {
  value: any,
  dataset: Object,
}

declare type CustomSyntheticEvent = {
  bubbles: boolean;
  cancelable: boolean;
  currentTarget: CustomSyntheticEventTarget;
  deepPath?: () => CustomSyntheticEventTarget[];
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  scoped: boolean;
  srcElement: Element;
  target: CustomSyntheticEventTarget;
  timeStamp: number;
  type: string;
  preventDefault(): void;
  stopImmediatePropagation(): void;
  stopPropagation(): void;
  AT_TARGET: number;
  BUBBLING_PHASE: number;
  CAPTURING_PHASE: number;
}
