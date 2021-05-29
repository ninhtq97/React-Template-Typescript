import { ComponentProps, forwardRef } from 'react';
import {
  CheckboxContainer,
  CheckboxLabel,
  HiddenCheckbox,
  Icon,
  StyledCheckbox,
} from './Styles';

const Checkbox = forwardRef<
  HTMLInputElement,
  ComponentProps<typeof HiddenCheckbox>
>(({ className, label, defaultChecked = false, ...props }, $ref) => {
  return (
    <CheckboxLabel onClick={(e) => e.stopPropagation()}>
      <CheckboxContainer className={className}>
        <HiddenCheckbox checked={defaultChecked} {...props} ref={$ref} />
        <StyledCheckbox checked={defaultChecked}>
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCheckbox>
      </CheckboxContainer>
      {label}
    </CheckboxLabel>
  );
});

export default Checkbox;
