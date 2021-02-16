import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

function Intro(props: { message: string | undefined, time: string | undefined }) {
  return (
    <>
      <div className="message">
        <h1>{props.message}</h1>
      </div>
      <div id="time">
        <h1>{props.time}</h1>
      </div>
    </>
  );
}

const component = TestRenderer.create(<Intro message="task2" time="2:31:55 PM"></Intro>);

describe('Intro', () => {
  test('snapshot renders', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

test('props should be find', () => {
  render(<Intro message="task2" time="2:31:55 PM"></Intro>);
  const message = screen.getByText(/task2/i);
  const time = screen.getByText(/2:31:55 PM/i);
  expect(message).toBeInTheDocument();
  expect(time).toBeInTheDocument();
});
