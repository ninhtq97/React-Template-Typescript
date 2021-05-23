import { forwardRef, ReactNode } from 'react';
import { Variant } from 'shared/@types/common';
import color from 'shared/styles/color';
import { StyledButton, StyledSpinner, Text } from './Styles';

type Props = {
  className?: string;
  variant?: Variant;
  icon?: ReactNode | JSX.Element;
  disabled?: boolean;
  isWorking?: boolean;
  onClick?: Function;
  [key: string]: any;
};

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      variant = 'secondary',
      icon,
      disabled,
      isWorking,
      onClick = () => {},
      ...buttonProps
    },
    $ref
  ) => {
    const handleClick = () => {
      if (!disabled && !isWorking) {
        onClick();
      }
    };

    return (
      <StyledButton
        {...buttonProps}
        onClick={handleClick}
        variant={variant}
        disabled={disabled || isWorking}
        isWorking={isWorking}
        iconOnly={!!children}
        ref={$ref}
      >
        {isWorking && <StyledSpinner size={26} color={getIconColor(variant)} />}
        {icon}
        {children && (
          <Text withPadding={isWorking || !!icon} color={getIconColor(variant)}>
            {children}
          </Text>
        )}
      </StyledButton>
    );
  }
);

const getIconColor = (variant: Variant) =>
  ['secondary', 'empty'].includes(variant) ? color.textDark : color.white;

export default Button;
