import React, { useCallback, useState } from 'react';
import './SidebarSelectNav.scoped.scss';

interface IProps {
  sideSortBy: [];
  defaultValue: string;
  updateCurrentSortBy: (e: string) => void;
}

interface SideSortByProps {
  value: string;
  label: string;
}

export default function SidebarSelectNav({
  sideSortBy,
  defaultValue,
  updateCurrentSortBy,
}: IProps): JSX.Element {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = useCallback(
    (event: any) => {
      setSelectedValue(event.value);
      updateCurrentSortBy(event.target.value);
    },
    [updateCurrentSortBy],
  );

  return (
    <div className="sidebar-select-nav">
      <select
        className="side-sort-select"
        onChange={(e) => handleChange(e)}
        value={sideSortBy.find((obj: SideSortByProps) => obj.value === selectedValue)}
      >
        {sideSortBy.map((obj: SideSortByProps) => (
          <option id={obj.value} key={obj.value} className="c-pointer" role="button">
            {obj.value}
          </option>
        ))}
      </select>
    </div>
  );
}
