import React from 'react';

import './Intro.less';

interface IntroProps {
  message: string;
  time: string;
}

const Intro = ({ message, time }: IntroProps): JSX.Element => (
  <>
    <div className="message">
      <h1>{message}</h1>
    </div>
    <div id="time">
      <h1>{time}</h1>
    </div>
  </>
);

export default Intro;
