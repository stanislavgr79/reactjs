import React from 'react';
import './Footer.scoped.scss';

const Footer = (props: { children?: React.ReactNode }): JSX.Element => (
  <div className="footer">{props.children}</div>
);

export default Footer;
