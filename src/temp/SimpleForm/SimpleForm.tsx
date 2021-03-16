// import React from 'react';
// import { Field, reduxForm } from 'redux-form';

// const SimpleForm = (props) => {
//   // eslint-disable-next-line react/prop-types
//   const { handleSubmit, pristine, reset, submitting } = props;
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>First Name</label>
//         <div>
//           <Field name="firstName" component="input" type="text" placeholder="First Name" />
//         </div>
//       </div>
//       <div>
//         <label>Sex</label>
//         <div>
//           <label>
//             <Field name="sex" component="input" type="radio" value="male" /> Male
//           </label>
//           <label>
//             <Field name="sex" component="input" type="radio" value="female" /> Female
//           </label>
//         </div>
//       </div>
//       <div>
//         <label>Favorite Color</label>
//         <div>
//           <Field name="favoriteColor" component="select" defaultValue="Green">
//             <option value="ff0000"></option>
//             <option value="ff0000">Red</option>
//             <option value="00ff00">Green</option>
//             <option value="0000ff">Blue</option>
//           </Field>
//         </div>
//       </div>
//       <div>
//         <label htmlFor="employed">Employed</label>
//         <div>
//           <Field name="employed" id="employed" component="input" type="checkbox" />
//         </div>
//       </div>
//       <div>
//         <label>Notes</label>
//         <div>
//           <Field name="notes" component="textarea" />
//         </div>
//       </div>
//       <div>
//         <button type="submit" disabled={pristine || submitting}>
//           Submit
//         </button>
//         <button type="button" disabled={pristine || submitting} onClick={reset}>
//           Clear Values
//         </button>
//       </div>
//     </form>
//   );
// };
// // a unique identifier for this form
// export default reduxForm({
//   form: 'simple',
// })(SimpleForm);
