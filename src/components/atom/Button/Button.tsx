import React from 'react';
import { createClassList } from '../../../helpers/utils';
import './Button.scoped.scss';

interface ButtonProps {
  className?: string;
  id?: string;
  modifier?: string;
  onClick?: (e: unknown) => void;
  buttonType?: 'button' | 'submit' | 'reset';
  label?: string;
  sharingType?: string;
}

const Button = ({
  onClick,
  label = '',
  buttonType,
  className,
  id,
  sharingType,
}: ButtonProps): JSX.Element => {
  const classList = createClassList(['btn button', className || '']);

  return (
    <button
      className={classList}
      id={id || ''}
      onClick={onClick}
      type={buttonType || 'button'}
      data-type={sharingType}
    >
      {label}
    </button>
  );
};

export default Button;
