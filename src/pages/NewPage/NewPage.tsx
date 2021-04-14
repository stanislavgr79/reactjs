import React from 'react';

import './NewPage.scoped.scss';
import { useLocation } from 'react-router-dom';

export default function NewPage(): JSX.Element {
  const location = useLocation();
  return (
    <div className="new-page">
      <div className="new-page-container">
        new page
        {location.pathname}
      </div>
      ;
    </div>
  );
}
