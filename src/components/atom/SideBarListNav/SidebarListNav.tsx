import React, { useState } from 'react';
import './SidebarListNav.scoped.scss';

interface SideGenreListProps {
  sideGenre: [];
  defaultValue: string;
  updateCurrentGenre: (e: string) => void;
}

interface SideGenreProps {
  value: string;
  label: string;
}

const SidebarListNav = ({
  sideGenre,
  defaultValue,
  updateCurrentGenre,
}: SideGenreListProps): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e) => {
    setSelectedIndex(e.target.id);
    updateCurrentGenre(e.target.value);
  };

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
};

export default SidebarListNav;
