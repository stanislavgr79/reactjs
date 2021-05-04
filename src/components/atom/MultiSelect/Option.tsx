import React from 'react';
import { components } from 'react-select';

export const Option = (props: any): JSX.Element => {
  return (
    <>
      <components.Option {...props}>
        <label htmlFor={props.value}>
          {props.value}
          <input
            id={props.value}
            type="checkbox"
            name={props.value}
            checked={props.isSelected}
            datatype={props.isSelected.toString()}
            onChange={() => null}
          />
        </label>{' '}
      </components.Option>
    </>
  );
};
