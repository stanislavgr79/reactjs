import React, { useCallback, useEffect, useState } from 'react';
import './SidebarSelectNav.scoped.scss';

interface IProps {
  sideSortBy: { value: string, label: string }[];
  defaultValue: string;
  updateCurrentSortBy: (sortBy: string) => void;
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

  const handleChange = useCallback((event: any) => {
    setSelectedValue(event.target.value);
  }, []);

  useEffect(() => {
    updateCurrentSortBy(selectedValue.toLowerCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  return (
    <div className="sidebar-select-nav">
      <select className="side-sort-select" onChange={(e) => handleChange(e)} value={selectedValue}>
        {sideSortBy.map((obj: SideSortByProps) => (
          <option
            id={obj.value}
            value={obj.value}
            key={obj.value}
            className="c-pointer"
            role="button"
          >
            {obj.label}
          </option>
        ))}
      </select>
    </div>
  );
}
