import React from 'react';
import { render } from '@testing-library/react';

import Footer from '../Footer';

jest.mock('../../../atom/SiteName', () => {
  return {
    __esModule: true,
    default: () => {
      return <p className="site_name"></p>;
    },
  };
});

describe('Footer', () => {
  test('snapshot renders', () => {
    const tree = render(<Footer />);

    expect(tree.baseElement).toMatchSnapshot();
    expect(tree.baseElement).toContainHTML('<div class="footer">');
  });
});
