import React, { useCallback, useEffect, useState } from 'react';
import { SortBy } from '../../../helpers/enums';

import './SidebarSelectNav.scoped.scss';

interface IProps {
  defaultValue: SortBy;
  updateCurrentSortBy: (sortBy: SortBy) => void;
}

export default function SidebarSelectNav({
  defaultValue,
  updateCurrentSortBy,
}: IProps): JSX.Element {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const sideSortBy = Object.entries(SortBy);

  const handleChange = useCallback((event: any) => {
    setSelectedValue(event.target.value);
  }, []);

  useEffect(() => {
    updateCurrentSortBy(selectedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  return (
    <div className="sidebar-select-nav">
      <select className="side-sort-select" onChange={(e) => handleChange(e)} value={selectedValue}>
        {sideSortBy.map(([key, value], index: number) => (
          <option
            id={`${value}-${index}`}
            value={value}
            key={index}
            className="c-pointer"
            role="button"
          >
            {key}
          </option>
        ))}
      </select>
    </div>
  );
}
