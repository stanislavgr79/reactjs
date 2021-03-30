import React from 'react';
import SiteName from '../../atom/SiteName';
import './Footer.scoped.scss';

export default function Footer(): JSX.Element {
  return (
    <div className="footer">
      <SiteName />
    </div>
  );
}
