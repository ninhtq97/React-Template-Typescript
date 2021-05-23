import { ChangeEvent, forwardRef, ReactNode } from 'react';
import { InputIconPlacement } from 'shared/@types/common';
import { InputElement, StyledIcon, StyledInput } from './Styles';

type Props = {
  className?: string;
  icon?: ReactNode | JSX.Element;
  filter?: RegExp;
  placement?: InputIconPlacement;
  onChange?: Function;
  [key: string]: any;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { icon, filter, placement = 'left', onChange = () => {}, ...inputProps },
    $ref
  ) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!filter || filter.test(event.target.value)) {
        onChange(event.target.value, event);
      }
    };

    return (
      <StyledInput>
        <StyledIcon placement={placement}>{icon}</StyledIcon>
        <InputElement
          {...inputProps}
          onChange={handleChange}
          hasIcon={!!icon}
          iconPlacement={placement}
          ref={$ref}
        />
      </StyledInput>
    );
  }
);

export default Input;
