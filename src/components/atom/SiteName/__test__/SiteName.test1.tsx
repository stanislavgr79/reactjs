import React from 'react';
import { render } from '@testing-library/react';

import SiteName from '../SiteName';

describe('SiteName', () => {
  test('snapshot renders', () => {
    const tree = render(<SiteName />);

    expect(tree.baseElement).toMatchSnapshot();
    expect(tree.baseElement).toContainHTML('<p class="site_name">');
  });
});
