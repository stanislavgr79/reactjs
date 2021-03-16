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

const SidebarSelectNav = ({
  sideSortBy,
  defaultValue,
  updateCurrentSortBy,
}: SideSortBySelectProps): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (e: any) => {
    setSelectedValue(e.value);
    updateCurrentSortBy(e.target.value);
  };

  return (
    <div className="sidebar-select-nav">
      <select
        className="side-sort-select"
        onChange={(e) => handleChange(e)}
        value={sideSortBy.find((obj: SideSortByProps) => obj.value === selectedValue)}
      >
        {sideSortBy.map((el: SideSortByProps) => (
          <option id={el.value} key={el.value} className="c-pointer" role="button">
            {el.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SidebarSelectNav;
