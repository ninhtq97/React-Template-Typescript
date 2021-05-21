import { forwardRef } from 'react';
import { InputElement, StyledInput } from './styles';

const Input = forwardRef<HTMLInputElement, any>((props, $ref) => {
  return (
    <StyledInput>
      <InputElement {...props} ref={$ref} />
    </StyledInput>
  );
});

export default Input;
