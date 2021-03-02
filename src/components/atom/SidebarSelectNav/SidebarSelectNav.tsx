import React, { useState } from 'react';
import './SidebarSelectNav.scoped.scss';

interface SideSortBySelectProps {
  sideSortBy: [];
  defaultValue: string;
  updateCurrentSortBy: (e: string) => void;
}

interface SideSortByProps {
  value: string;
  label: string;
}

function SideSortBySelect({
  sideSortBy,
  defaultValue,
  updateCurrentSortBy,
}: SideSortBySelectProps): JSX.Element {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const handleChange = (e: any) => {
    setSelectedValue(e.value);
    updateCurrentSortBy(e.target.value);
  };

  return (
    <select
      className="side-sort-select"
      onChange={(e) => handleChange(e)}
      value={sideSortBy.find((obj: any) => obj.value === selectedValue)}
    >
      {sideSortBy.map((el: SideSortByProps) => (
        <option id={el.value} key={el.value} className="c-pointer" role="button">
          {el.value}
        </option>
      ))}
    </select>
  );
}

function SidebarSelectNav(props: {
  sideSortBy: [],
  sort: string,
  updateCurrentSortBy: (e: string) => void,
}) {
  return (
    <div className="sidebar-select-nav">
      <SideSortBySelect
        sideSortBy={props.sideSortBy}
        defaultValue={props.sort}
        updateCurrentSortBy={props.updateCurrentSortBy}
      />
    </div>
  );
}

export default SidebarSelectNav;
