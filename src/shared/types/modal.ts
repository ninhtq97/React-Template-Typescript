export type ModalVariant = 'center' | 'aside';

export type ConfirmModalVariant = 'primary' | 'danger';

export type ModalRenderLinkProps = {
  open: () => void;
};

export type ModalRenderContentProps = {
  close: () => void;
};

export type ModalAction = ModalRenderLinkProps & ModalRenderContentProps;
