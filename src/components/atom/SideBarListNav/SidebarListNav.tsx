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

function SideGenreList({
  sideGenre,
  defaultValue,
  updateCurrentGenre,
}: SideGenreListProps): JSX.Element {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const handleChange = (e: any) => {
    setSelectedValue(e.value);
    updateCurrentGenre(e.target.value);
  };

  return (
    <>
      <form
        className="side-genre-list"
        onChange={(event) => event.preventDefault()}
        defaultValue={sideGenre.find((obj: any) => obj.value === selectedValue)}
      >
        {sideGenre.map((el: SideGenreProps) => (
          <option id={el.value} key={el.value} onClick={(e) => handleChange(e)}>
            {el.value}
          </option>
        ))}
      </form>
    </>
  );
}

function SidebarListNav(props: {
  sideGenre: [],
  genre: string,
  updateCurrentGenre: (e: string) => void,
}) {
  return (
    <div className="sidebar-list-nav">
      <SideGenreList
        sideGenre={props.sideGenre}
        defaultValue={props.genre}
        updateCurrentGenre={props.updateCurrentGenre}
      />
    </div>
  );
}

export default SidebarListNav;
