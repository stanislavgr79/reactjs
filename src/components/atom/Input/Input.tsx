import React from 'react';

interface InputProps {
  type?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  name?: string;
  autoComplete?: string;
  onChange?: (event: unknown) => void;
  onBlur?: (event: unknown) => void;
  onFocus?: (event: unknown) => void;
  value?: string | number | string[];
}

export const Input = ({
  type,
  id,
  placeholder,
  className,
  name,
  autoComplete,
  onChange,
  onBlur,
  onFocus,
  value,
}: InputProps) => (
  <input
    className={`input${className ? ` ${className}` : ''}`}
    id={id}
    type={`${type ? `${type}` : 'text'}`}
    placeholder={placeholder}
    name={name}
    autoComplete={autoComplete}
    onChange={onChange}
    onBlur={onBlur}
    onFocus={onFocus}
    value={value}
  />
);

// class Input extends Component {
//   render() {
//     const { name, onChange } = this.props;
//     return (
//       <div className="row">
//         <div className="input-field col s12">
//           <input
//             id={name}
//             type="text"
//             className="validate flow-text"
//             onChange={this.props.onChange}
//           />
//           <label htmlFor={name}>Name of Recipe</label>
//         </div>
//       </div>
//     );
//   }
// }

// function Input() {
//   /* Define local state hook to store the "user input" data */
//   const [userInput, setUserInput] = React.useState('');

//   const onClick = (e: { preventDefault: () => void }) => {
//     /* Prevent button click's default behavior */
//     e.preventDefault();
//     /* Call the state's "setter" method to update "userInput" state */
//     setUserInput('Test');
//   };

//   /* Render both input and button in a <> fragment */
//   return (
//     <>
//       <input value={this.state.userInput} name="sampleInput" />
//       <button onClick={onClick}>Click me</button>
//     </>
//   );
// }

// export default Input;
