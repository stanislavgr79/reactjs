import React from 'react';

interface IProps {
  type?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  name?: string;
  autoComplete?: string;
  onChange?: (event: unknown) => void;
  onBlur?: (event: unknown) => void;
  onFocus?: (event: unknown) => void;
  value?: string | ReadonlyArray<string> | number | undefined;
  readonly?: boolean;
  min?: string;
}

export default function Input({
  type,
  id,
  placeholder,
  className,
  name,
  autoComplete,
  onChange,
  onBlur,
  onFocus,
  value,
  readonly,
  min,
}: IProps): JSX.Element {
  return (
    <input
      className={`input${className ? ` ${className}` : ''}`}
      id={id}
      type={`${type ? `${type}` : 'text'}`}
      placeholder={placeholder}
      name={name}
      autoComplete={autoComplete}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      readOnly={readonly}
      min={min}
    />
  );
}
