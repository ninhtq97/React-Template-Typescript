export type Variant =
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'secondary'
  | 'empty';

export type InputIconPlacement = 'left' | 'right';

export type Placement = 'top' | 'bottom' | InputIconPlacement;

export type FullPlacement =
  | 'topLeft'
  | 'topRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom'
  | 'bottomLeft'
  | 'bottomRight'
  | Placement;
