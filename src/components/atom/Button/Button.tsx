import React from 'react';
import { createClassList } from '../../../helpers/utils';
import './Button.scoped.scss';

interface IProps {
  className?: string;
  id?: string;
  modifier?: string;
  onClick?: (e: unknown) => void;
  buttonType?: 'button' | 'submit' | 'reset';
  label?: string;
  title?: string;
  sharingType?: string;
  disabled?: boolean;
}

export default function Button({
  onClick,
  label = '',
  buttonType,
  className,
  id,
  title,
  sharingType,
  disabled,
}: IProps): JSX.Element {
  const classList = createClassList(['btn button', className || '']);

  return (
    <button
      className={classList}
      id={id || ''}
      onClick={onClick}
      type={buttonType || 'button'}
      data-type={sharingType}
      title={title}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
