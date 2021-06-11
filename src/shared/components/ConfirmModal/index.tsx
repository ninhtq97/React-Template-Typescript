import { FC, Fragment, useState } from 'react';
import { ConfirmModalVariant } from 'shared/types/modal';
import {
  Actions,
  Message,
  StyledButton,
  StyledConfirmModal,
  Title,
} from './Styles';

type Props = {
  className?: string;
  variant?: ConfirmModalVariant;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: Function;
  renderLink: FC<any>;
};

const ConfirmModal: FC<Props> = ({
  className,
  variant = 'primary',
  title = 'Warning',
  message = 'Are you sure you want to continue with this action?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  renderLink,
}) => {
  const [isWorking, setWorking] = useState(false);

  const handleConfirm = (modal) => {
    setWorking(true);
    onConfirm({
      close: () => {
        modal.close();
        setWorking(false);
      },
    });
  };

  return (
    <StyledConfirmModal
      className={className}
      withCloseIcon={false}
      renderLink={renderLink}
      renderContent={(modal) => (
        <Fragment>
          <Title>{title}</Title>
          {message && <Message>{message}</Message>}
          <Actions>
            <StyledButton
              variant={variant}
              isWorking={isWorking}
              onClick={() => handleConfirm(modal)}
            >
              {confirmText}
            </StyledButton>
            <StyledButton hollow onClick={modal.close}>
              {cancelText}
            </StyledButton>
          </Actions>
        </Fragment>
      )}
    />
  );
};

export default ConfirmModal;
