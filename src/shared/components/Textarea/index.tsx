import { forwardRef } from 'react';
import TextareaAutoSize from 'react-textarea-autosize';
import { StyledTextarea } from './Styles';

type Props = {
  className?: string;
  invalid?: boolean;
  value?: string;
  onChange: Function;
  [k: string]: any;
};

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, invalid = false, onChange, ...textareaProps }, $ref) => (
    <StyledTextarea className={className} invalid={invalid}>
      <TextareaAutoSize
        {...textareaProps}
        onChange={(event) => onChange(event.target.value, event)}
        ref={$ref}
      />
    </StyledTextarea>
  )
);

export default Textarea;
