export type ModalVariant = 'center' | 'aside';

export type ModalRenderLinkProps = {
  open: () => void;
};

export type ModalRenderContentProps = {
  close: () => void;
};

export type ModalAction = ModalRenderLinkProps & ModalRenderContentProps;
