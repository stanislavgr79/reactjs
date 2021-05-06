import React from 'react';

import ErrorBoundary from '../ErrorBoundary';

import { render } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe('ErrorBoundary', () => {
  test('should render children', () => {
    const tree = render(<ErrorBoundary>children</ErrorBoundary>);

    expect(tree.baseElement).toMatchSnapshot();
  });
});

describe('ErrorBoundary', () => {
  let ErrorBoundaryComponent: any;
  const testError = {
    name: 'test error',
    message: 'test error message',
  };

  beforeAll(() => {
    jest.spyOn(global.console, 'log');
    ErrorBoundaryComponent = shallow(
      <ErrorBoundary>
        <h1>wassup</h1>
      </ErrorBoundary>,
    );
    ErrorBoundaryComponent.instance().componentDidCatch(testError, 'oh nooos an error');
    ErrorBoundaryComponent.update();
    const tree = toJson(ErrorBoundaryComponent);
    expect(tree).toMatchSnapshot();
  });

  it('should update the state to indicate an error', () => {
    expect(ErrorBoundaryComponent.instance().state.hasError).toBeTruthy();
  });

  it('should not render the child component', () => {
    expect(ErrorBoundaryComponent.find('h1').exists()).toBeFalsy();
  });
});
