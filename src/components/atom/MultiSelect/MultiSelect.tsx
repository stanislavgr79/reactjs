import React from 'react';
import Select, { CommonProps, components, GroupTypeBase, OptionTypeBase } from 'react-select';
import { transformGenresToArrayObjects } from '../../../helpers/utils';

const select_genres: { value: string, label: string }[] = require('@resources/select_genres.json');

const Option = (props: any): JSX.Element => {
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

const MultiValue = (
  props: JSX.IntrinsicAttributes &
    CommonProps<OptionTypeBase, true, GroupTypeBase<OptionTypeBase>> & {
      children: React.ReactNode,
      components: unknown,
      cropWithEllipsis: boolean,
      data: OptionTypeBase,
      innerProps: unknown,
      isFocused: boolean,
      isDisabled: boolean,
      removeProps: {
        onTouchEnd: (event: unknown) => void,
        onClick: (event: unknown) => void,
        onMouseDown: (event: unknown) => void,
      },
    },
): JSX.Element => {
  return (
    <components.MultiValue {...props}>
      <span>{props.data.label}</span>
    </components.MultiValue>
  );
};

interface IProps {
  genres: string[] | { label: string, value: string }[];
  handleChangeGenre: (genres: any) => void;
}

export default function MultiSelect({ genres, handleChangeGenre }: IProps): JSX.Element {
  return (
    <Select
      className="select_genres"
      closeMenuOnSelect={false}
      placeholder="Select Genre"
      isMulti={true}
      components={{ Option, MultiValue }}
      value={typeof genres[0] === 'object' ? genres : transformGenresToArrayObjects(genres)}
      options={select_genres}
      hideSelectedOptions={false}
      menuIsClose={false}
      backspaceRemovesValue={false}
      onChange={(e) => handleChangeGenre(e)}
    />
  );
}
