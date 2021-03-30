import React from 'react';
import { components } from 'react-select';

export const Option = (props: any): JSX.Element => {
  return (
    <>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          datatype={props.isSelected.toString()}
          onChange={() => null}
        />{' '}
        <label>{props.value} </label>
      </components.Option>
    </>
  );
};
