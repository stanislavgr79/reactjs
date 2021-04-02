import { FormikState } from 'formik';
import React from 'react';
import { IMovie } from '../../../helpers/interface';
import { createClassList } from '../../../helpers/utils';
import './Button.scoped.scss';

interface IProps {
  className?: string;
  id?: string;
  modifier?: string;
  onClick?:
    | ((e: unknown) => void)
    | ((
        nextState?:
          | Partial<
              FormikState<{
                id: number | undefined,
                title: string,
                release_date: string,
                poster_path: string | undefined,
                genres: string[],
                overview: string,
                runtime: number,
              }>
            >
          | undefined,
      ) => void)
    | ((nextState?: Partial<FormikState<IMovie>> | undefined) => void);
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
