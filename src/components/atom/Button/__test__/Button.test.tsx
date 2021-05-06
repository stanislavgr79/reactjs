import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Button from '../Button';

jest.mock('../../../../helpers/utils', () => ({
  createClassList: () => {
    return 'array of classes';
  },
}));

describe('Button', () => {
  const click = jest.fn();

  test('render', () => {
    const tree = render(
      <Button
        onClick={click}
        label="test-label"
        buttonType="submit"
        className={'test_class'}
        id={'test-id'}
        title={'test-title'}
        sharingType={'test-sharing'}
        disabled={false}
      />,
    );
    expect(tree.baseElement).toMatchSnapshot();
  });

  test('render with out `type`, it must be `button`', () => {
    const tree = render(
      <Button
        onClick={click}
        label="test-label"
        className={'test_class'}
        id={'test-id'}
        title={'test-title'}
        sharingType={'test-sharing'}
        disabled={false}
      />,
    );
    expect(tree.baseElement).toMatchSnapshot();
  });

  test('render with out `className`', () => {
    const tree = render(
      <Button
        onClick={click}
        label="test-label"
        id={'test-id'}
        title={'test-title'}
        sharingType={'test-sharing'}
        disabled={false}
      />,
    );
    expect(tree.baseElement).toMatchSnapshot();
  });

  test('onClick', () => {
    const tree = render(<Button onClick={click} />);
    fireEvent.click(tree.getByRole('button'));
    expect(click).toBeCalled();
  });
});
