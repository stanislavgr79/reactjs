import React from 'react';
import SiteName from '../../atom/SiteName';
import './Footer.scoped.scss';

const Footer = (): JSX.Element => (
  <div className="footer">
    <SiteName />
  </div>
);

export default Footer;
