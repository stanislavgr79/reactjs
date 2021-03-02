// import React, { Component } from 'react';
// import './Select.scoped.scss';

// export default class Select extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedValue: '',
//     };
//     this.handleChange = this.handleChange.bind(this);

//     this.options = [
//       { value: 'foo', label: 'Foo' },
//       { value: 'bar', label: 'Bar' },
//       { value: 'baz', label: 'Baz' },
//     ];
//   }

//   componentDidMount() {
//     this.setState({
//       selectedValue: this.props.defaultValue,
//     });
//   }

//   handleChange(selectedOption) {
//     this.setState({ selectedValue: selectedOption.target.value });
//   }

//   render() {
//     return (
//       <Select
//         value={this.options.filter(({ value }) => value === this.state.selectedValue)}
//         onChange={this.handleChange}
//         options={this.options}
//       />
//     );
//   }
// }

// Select.propTypes = {
//   defaultValue: PropTypes.string.isRequired,
// };
