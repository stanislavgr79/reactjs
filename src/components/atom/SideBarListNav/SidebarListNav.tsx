import React, { useCallback, useState } from 'react';
import './SidebarListNav.scoped.scss';

interface IProps {
  sideGenre: [];
  defaultValue: string;
  updateCurrentGenre: (e: string) => void;
}

interface SideGenreProps {
  value: string;
  label: string;
}

export default function SidebarListNav({
  sideGenre,
  defaultValue,
  updateCurrentGenre,
}: IProps): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = useCallback(
    (event: any) => {
      setSelectedIndex(event.target.id);
      updateCurrentGenre(event.target.value);
    },
    [updateCurrentGenre],
  );

  return (
    <div className="sidebar-list-nav">
      <form
        className="side-genre-list"
        onChange={(event) => event.preventDefault()}
        defaultValue={defaultValue}
      >
        {sideGenre.map((el: SideGenreProps, index: number) => (
          <option
            className={selectedIndex == index ? 'selected' : ''}
            id={'' + index}
            key={index}
            onClick={(e) => handleChange(e)}
          >
            {el.value}
          </option>
        ))}
      </form>
    </div>
  );
}
