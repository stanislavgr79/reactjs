import React from 'react';

interface InputProps {
  type?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  name?: string;
  autoComplete?: string;
  onChange?: (event: unknown) => void;
  onBlur?: (event: unknown) => void;
  onFocus?: (event: unknown) => void;
  value?: string | number | string[];
}

export const Input = ({
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
}: InputProps): JSX.Element => (
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
  />
);
