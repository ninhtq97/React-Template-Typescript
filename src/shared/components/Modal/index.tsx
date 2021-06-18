import { CloseOutline } from '@styled-icons/evaicons-outline';
import { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useOnEscapeKeyDown from 'shared/hooks/onEscapeKeyDown';
import useOnOutsideClick from 'shared/hooks/onOutsideClick';
import { ModalVariant } from 'shared/types/modal';
import {
  ClickableOverlay,
  CloseIcon,
  ScrollOverlay,
  StyledModal,
} from './Styles';

type Props = {
  className?: string;
  variant?: ModalVariant;
  width?: number;
  withCloseIcon?: boolean;
  isOpen?: boolean;
  onClose?: Function;
  renderLink: FC<any>;
  renderContent: FC<any>;
};

const Modal: FC<Props> = ({
  className,
  variant = 'center',
  width = 600,
  withCloseIcon = true,
  isOpen: propsIsOpen,
  onClose: tellParentToClose = () => {},
  renderLink,
  renderContent,
}) => {
  const [stateIsOpen, setStateOpen] = useState(false);
  const isControlled = typeof propsIsOpen === 'boolean';
  const isOpen = isControlled ? !!propsIsOpen : stateIsOpen;

  const $modalRef = useRef();
  const $clickableOverlayRef = useRef();

  const closeModal = useCallback(() => {
    if (!isControlled) {
      setStateOpen(false);
    } else {
      tellParentToClose();
    }
  }, [isControlled, tellParentToClose]);

  useOnOutsideClick($modalRef, isOpen, closeModal, $clickableOverlayRef);
  useOnEscapeKeyDown(isOpen, closeModal);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'visible';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  return (
    <Fragment>
      {!isControlled && renderLink({ open: () => setStateOpen(true) })}

      {isOpen &&
        createPortal(
          <ScrollOverlay>
            <ClickableOverlay variant={variant} ref={$clickableOverlayRef}>
              <StyledModal
                className={className}
                variant={variant}
                width={width}
                ref={$modalRef}
              >
                {withCloseIcon && (
                  <CloseIcon variant={variant} onClick={closeModal}>
                    <CloseOutline size={24} />
                  </CloseIcon>
                )}
                {renderContent({ close: closeModal })}
              </StyledModal>
            </ClickableOverlay>
          </ScrollOverlay>,
          $root
        )}
    </Fragment>
  );
};

const $root = document.getElementById('root')!!;

export default Modal;
