// @flow

import React, { useState, useCallback, useEffect } from 'react';

import { valueFromEventTarget } from 'core/dom';

import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

function DebouncedInput(props: any) {
  const {
    value,
    setRef,
    onChange,
    ...otherProps
  } = props;
  const [cachedValue, setValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const noop = useCallback(() => undefined, []);

  const updateValue = useCallback(
    (e: Event) => {
      setValue(valueFromEventTarget(e.target));
    },
    [setValue],
  );

  const onBlur = useCallback(
    () => {
      if (onChange && value !== cachedValue) onChange(cachedValue);
    },
    [cachedValue, onChange, value],
  );

  useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value);
    }

    if (value !== prevValue && value !== cachedValue) {
      setValue(value);
    }
  }, [value, prevValue, cachedValue, setPrevValue, setValue]);

  return (
    <Input
      {...otherProps}
      ref={setRef || noop}
      value={cachedValue}
      onChange={updateValue}
      onBlur={onBlur}
    />
  );
}

export default DebouncedInput;
