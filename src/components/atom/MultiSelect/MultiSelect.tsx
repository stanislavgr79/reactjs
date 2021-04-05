import React from 'react';
import Select from 'react-select';
import { MultiValue } from './MultiValue';
import { Option } from './Option';

import {
  transformGenresToArrayObjects,
  transformGenresToStringArray,
} from '../../../helpers/utils';
import { selectGenres } from '../../../helpers/enums';

interface IProps {
  name: string;
  value: string[];
  onChange: (name: string, val: string[]) => void;
}

export default function MultiSelect({ name, value, onChange }: IProps): JSX.Element {
  return (
    <Select
      name={name}
      className="select_genres"
      closeMenuOnSelect={false}
      placeholder="Select Genre"
      isMulti={true}
      components={{ Option, MultiValue }}
      value={transformGenresToArrayObjects(value)}
      options={selectGenres}
      hideSelectedOptions={false}
      menuIsClose={false}
      backspaceRemovesValue={false}
      onChange={(val) => {
        onChange(name, transformGenresToStringArray(val));
      }}
    />
  );
}
