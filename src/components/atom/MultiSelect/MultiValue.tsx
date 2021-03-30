import React from 'react';
import { CommonProps, components, GroupTypeBase, OptionTypeBase } from 'react-select';

export const MultiValue = (
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
