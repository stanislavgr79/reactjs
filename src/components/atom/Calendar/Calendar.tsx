import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';

import calendar from '@resources/images/calendar.png';

interface IPropInput {
  value: string | undefined;
  onClick: (date: any) => void;
}

const CustomInput = forwardRef(
  ({ value, onClick }: IPropInput, ref: React.LegacyRef<HTMLInputElement>) => {
    return (
      <>
        <input
          name="release_date"
          className="simple_input"
          placeholder="Select Date"
          value={value}
          ref={ref}
          readOnly
        ></input>
        <img src={calendar} className="image_calendar" onClick={onClick} alt="" />
      </>
    );
  },
);

interface IProps {
  name: string;
  value: string;
  onChange: (field: string, value: string, shouldValidate?: boolean | undefined) => void;
  handleChangeReleaseDate: (date: any) => void;
}

export default function Calendar({
  name,
  value,
  onChange,
  handleChangeReleaseDate,
}: IProps): JSX.Element {
  const ref: React.LegacyRef<HTMLInputElement> = React.createRef();
  return (
    <DatePicker
      name={name}
      selected={value ? new Date(value) : null}
      placeholderText="Select Date"
      dateFormat="yyyy-MM-dd"
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      onChange={(val) => {
        onChange(name, val);
      }}
      customInput={
        <CustomInput
          value={value ? new Date(value).toString() : ''}
          onClick={handleChangeReleaseDate}
          ref={ref}
        />
      }
      calendarClassName="calendar"
      onKeyDown={(e) => e.preventDefault()}
    />
  );
}
