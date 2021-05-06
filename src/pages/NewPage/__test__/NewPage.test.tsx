import React from 'react';
import { render } from '@testing-library/react';
import ReactRouter from 'react-router';

import NewPage from '../NewPage';

describe('NewPage', () => {
  test('snapshot renders', () => {
    const mockLocation = {
      pathname: '/movies',
      search: '',
      state: null,
      hash: '',
    };

    jest.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);
    const tree = render(<NewPage />);

    expect(tree.baseElement).toMatchSnapshot();
    expect(tree.baseElement).toContainHTML('<div class="new-page">');
  });
});
