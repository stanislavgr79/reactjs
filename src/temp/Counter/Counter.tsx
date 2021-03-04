import React from 'react';

class Counter extends React.Component {
  increment = () => {
    // fill
  };

  decrement = () => {
    // fill
  };

  render() {
    // reference as a js object
    return (
      <div className="Counter">
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>&ndash;</button>
          <span className="count">{this.props}</span>
          <button onClick={this.increment}>&ndash;</button>
        </div>
      </div>
    );
  }
}

export default Counter;
