import React from 'react';
import Select from 'react-select';
import { MultiValue } from './MultiValue';
import { Option } from './Option';

import { transformGenresToArrayObjects } from '../../../helpers/utils';
import { selectGenres } from '../../../helpers/enums';

interface IProps {
  genres: string[];
  handleChangeGenre: (genres: { label: string, value: string }[]) => void;
}

export default function MultiSelect({ genres, handleChangeGenre }: IProps): JSX.Element {
  return (
    <Select
      className="select_genres"
      closeMenuOnSelect={false}
      placeholder="Select Genre"
      isMulti={true}
      components={{ Option, MultiValue }}
      value={transformGenresToArrayObjects(genres)}
      options={selectGenres}
      hideSelectedOptions={false}
      menuIsClose={false}
      backspaceRemovesValue={false}
      onChange={(e) => handleChangeGenre(e)}
    />
  );
}
