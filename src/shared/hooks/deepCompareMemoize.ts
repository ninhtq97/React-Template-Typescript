import { isEqual } from 'lodash';
import { MutableRefObject, useRef } from 'react';

const useDeepCompareMemorize = (value: MutableRefObject<any>[]): any => {
  const valueRef = useRef<any>();

  if (!isEqual(value, valueRef.current)) {
    valueRef.current = value;
  }
  return valueRef.current;
};

export default useDeepCompareMemorize;
