import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import Input from '.';

const InputDebounce = ({ onChange, value: propsValue, ...props }) => {
  const [value, setValue] = useState(propsValue);
  const isControlled = !!propsValue;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(
    debounce((newValue) => onChange(newValue), 500),
    []
  );

  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    if (propsValue !== valueRef.current) {
      setValue(propsValue);
    }
  }, [propsValue]);

  return (
    <Input
      {...props}
      value={isControlled ? value : undefined}
      onChange={(newValue) => {
        setValue(newValue);
        handleChange(newValue);
      }}
    />
  );
};

export default InputDebounce;
