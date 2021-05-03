import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import ModelMoviePopup from '../ModelMoviePopup';

import { render, screen, fireEvent, act } from '@testing-library/react';
import {
  MoviesActionTypes,
  UPDATE_MOVIE_SUCCESS,
  UPDATE_STATUS_MOVIE_POPUP,
} from '../../../../redux/types/movies-reducer-types';
import { IMovie } from '../../../../helpers/interface';

jest.mock('../../../atom/SiteName', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="siteName"></div>;
    },
  };
});
jest.mock('../../../structure/Footer', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="footer"></div>;
    },
  };
});
jest.mock('../../../../redux/actions/movies-actions', () => ({
  fetchUpdateMovie: (movie: IMovie): MoviesActionTypes => {
    return {
      type: UPDATE_MOVIE_SUCCESS,
      payload: movie,
    };
  },
  updateShowPopup: (): MoviesActionTypes => {
    return {
      type: UPDATE_STATUS_MOVIE_POPUP,
      payload: false,
    };
  },
}));

describe('ModelMoviePopup', () => {
  const initialState = { moviesStore: { showPopup: true } };
  const mockStore = configureStore();
  const closePopup = jest.fn();
  let store;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('handleSubmit function', async () => {
    // const promise = Promise.resolve();
    store = mockStore(initialState);
    const movie = {
      id: 12345,
      title: 'title',
      release_date: '2020-01-02',
      genres: ['crime'],
      overview: 'overview',
      runtime: 66,
    };
    const tree = render(
      <Provider store={store}>
        <ModelMoviePopup movie={movie} closePopup={closePopup} role="edit" />
      </Provider>,
    );

    const expectedActions = [
      { type: 'UPDATE_MOVIE_SUCCESS', payload: movie },
      { type: 'UPDATE_STATUS_MOVIE_POPUP', payload: false },
    ];

    expect(tree.baseElement).toMatchSnapshot();
    fireEvent.click(screen.getByRole('button', { name: 'SAVE' }));
    expect(closePopup).toBeCalled();
    // expect(store.getActions()).toEqual(expectedActions);
    // await act(() => promise);
  });
});

// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable prettier/prettier */
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import { act } from 'react-dom/test-utils';
// // import { fireEvent, RenderOptions, RenderResult, screen, waitFor } from '@testing-library/react';
// // eslint-disable-next-line max-len
// import { fireEvent, render, RenderOptions, RenderResult, screen, waitFor } from '@testing-library/react';
// import user from '@testing-library/user-event';
// // import userEvent from '@testing-library/user-event';

// import ModelMoviePopup from '../ModelMoviePopup';
// import {
//   MoviesActionTypes,
//   UPDATE_MOVIE_SUCCESS,
//   UPDATE_STATUS_MOVIE_POPUP,
// } from '../../../../redux/types/movies-reducer-types';
// import { IMovie } from '../../../../helpers/interface';

// jest.mock('../../../atom/SiteName', () => {
//   return {
//     __esModule: true,
//     default: () => {
//       return <div className="siteName"></div>;
//     },
//   };
// });
// jest.mock('../../../structure/Footer', () => {
//   return {
//     __esModule: true,
//     default: () => {
//       return <div className="footer"></div>;
//     },
//   };
// });
// jest.mock('../../../../redux/actions/movies-actions', () => ({
//   fetchUpdateMovie: (movie: IMovie): MoviesActionTypes => {
//     return {
//       type: UPDATE_MOVIE_SUCCESS,
//       payload: movie,
//     };
//   },
//   updateShowPopup: (): MoviesActionTypes => {
//     return {
//       type: UPDATE_STATUS_MOVIE_POPUP,
//       payload: false,
//     };
//   },
// }));

// describe('ModelMoviePopup', () => {
//   const movie = {
//     id: 12345,
//     title: 'title',
//     release_date: '2020-01-02',
//     genres: ['crime'],
//     overview: 'overview',
//     runtime: 66,
//   };
//   const initialState = { moviesStore: { showPopup: true } };
//   const mockStore = configureStore();
//   const handleSubmit = jest.fn();
//   const closePopup = jest.fn();
//   //   let store;
//   //   let tree: JSX.Element;

//   afterEach(() => {
//     // tree = <div></div>;
//     jest.clearAllMocks();
//   });

//   //   it('rendering and submitting a basic Formik form', async () => {
//   test('handleClick function', () => {
//     const store = mockStore(initialState);
//     // eslint-disable-next-line max-len
//     // let tree: RenderResult<typeof import ('@testing-library/dom/types/queries'), HTMLElement>;

//     // act(() => {
//     //   tree = render(
//     //     <Provider store={store}>
//     //       <ModelMoviePopup movie={movie} closePopup={closePopup} role="edit" />
//     //     </Provider>,
//     //   );
//     // });

//     const tree = render(
//       <Provider store={store}>
//         <ModelMoviePopup movie={movie} closePopup={closePopup} role="edit" />
//       </Provider>,
//     );

//     const expectedActions = [
//       { type: 'UPDATE_MOVIE_SUCCESS', payload: movie },
//       { type: 'UPDATE_STATUS_MOVIE_POPUP', payload: false },
//     ];

//     expect(tree.baseElement).toMatchSnapshot();

//     // userEvent.type(screen.getByLabelText(/first name/i), 'John');
//     // userEvent.type(screen.getByLabelText(/last name/i), 'Dee');
//     // userEvent.type(screen.getByLabelText(/email/i), 'john.dee@someemail.com');

//     expect(screen.getByRole('button', { name: /SAVE/i })).toBeInTheDocument();
//     // fireEvent.click(screen.getByRole('button', { name: /SAVE/i }));

//     //   fireEvent.click(screen.getByText('+ ADD MOVIE'));
//     //  fireEvent.click(screen.getByRole('button', { name: 'CONFIRM' }));

//     // await waitFor(() =>
//     //   expect(handleSubmit).toHaveBeenCalledWith(
//     //     {
//     //       email: 'john.dee@someemail.com',
//     //       firstName: 'John',
//     //       lastName: 'Dee',
//     //     },
//     //     expect.anything(),
//     //   ),
//     // );
//     // expect(closePopup).toBeCalled();
//     // expect(store.getActions()).toEqual(expectedActions);

//     // expect(tree.baseElement).toMatchSnapshot();
//     fireEvent.click(screen.getByRole('button', { name: 'SAVE' }));
//     expect(closePopup).toBeCalled();
//     // expect(store.getActions()).toEqual(expectedActions);
//   });
// });

// // describe('ModelMoviePopup', () => {
// //   const movie = {
// //     id: 12345,
// //     title: 'title',
// //     release_date: '2020-01-02',
// //     genres: ['crime'],
// //     overview: 'overview',
// //     runtime: 66,
// //   };
// //   const initialState = { moviesStore: { showPopup: true } };
// //   const mockStore = configureStore();
// //   const movieId = 123456;
// //   const closePopup = jest.fn();
// //   let store;

// //   afterEach(() => {
// //     jest.clearAllMocks();
// //   });

// // //   test('handleSubmitEdit', () => {
// // //     store = mockStore(initialState);
// // //     const tree = render(
// // //       <Provider store={store}>
// // //         <ModelMoviePopup movie={movie} closePopup={closePopup} role="edit" />
// // //       </Provider>,
// // //     );

// // //     const expectedActions = [
// // //       { type: 'UPDATE_MOVIE_SUCCESS', payload: movie },
// // //       { type: 'UPDATE_STATUS_MOVIE_POPUP', payload: false },
// // //     ];

// // //     expect(tree.baseElement).toMatchSnapshot();
// // //     fireEvent.click(screen.getByRole('button', { name: 'SAVE' }));
// // //     expect(closePopup).toBeCalled();
// // //     expect(store.getActions()).toEqual(expectedActions);
// // //   });

// // // // eslint-disable-next-line max-len
// // // let container: Element | DocumentFragment | RenderOptions<typeof import("@testing-library/dom/types/queries"), HTMLElement> | null;
// // //   test('search input value display test2', async () => {
// // //     const promise = Promise.resolve();
// // //     // store = mockStore();
// // //     const store = mockStore(initialState);
// // //     container = render(<div></div>);
// // //     const closePopup = jest.fn();

// // //     // render(
// // //     //   <Provider store={store}>
// // //     //     <ModelMoviePopup movie={movie} closePopup={closePopup} role="edit" />
// // //     //   </Provider>,
// // //     // );
// // //     act(() => {
// // //         container = render(<Provider store={store}>
// // //             <ModelMoviePopup movie={movie} closePopup={closePopup} role="edit" />
// // //           </Provider>,);
// // //       });

// // //     expect(container.baseElement).toMatchSnapshot();
// // //     expect(screen.getByRole('button', { name: /SAVE/i })).toBeInTheDocument();
// // //     const button = screen.getByRole('button', { name: 'SAVE' });

// // //     console.log('!!!!!!!!!');
// // //     // console.log(button);
// // //     // expect(screen.queryByText(/film/)).toBeNull();
// // //     act(() => {
// // //         // button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
// // //         // user.click(screen.getByRole('button', { name: 'SAVE' }));
// // //         fireEvent.click(screen.getByRole('button', { name: 'SAVE' }));
// // //     });
// // //     await act(() => promise);
// // //     fireEvent.click(screen.getByRole('button', { name: 'SAVE' }));
// // //     expect(closePopup).toBeCalled();
// // //     await act(() => promise);

// // //   });

// //   // eslint-disable-next-line prettier/prettier
// //   // eslint-disable-next-line max-len

// // //   it('can render and update a counter', () => {
// // //     const store = mockStore(initialState);
// // //     // Test first render and componentDidMount
// // //     act(() => {
// // //         ReactDOM.render(
// // //         <Provider store={store}>
// // //         <ModelMoviePopup movie={movie} closePopup={closePopup} role="edit" />
// // //       </Provider>, container);
// // //     });
// // //     const button = container.querySelector('button');
// // //     const label = container.querySelector('p');
// // //     expect(label.textContent).toBe('You clicked 0 times');
// // //     expect(document.title).toBe('You clicked 0 times');

// // //     // Test second render and componentDidUpdate
// // //     act(() => {
// // //       button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
// // //     });
// // //     expect(label.textContent).toBe('You clicked 1 times');
// // //     expect(document.title).toBe('You clicked 1 times');
// // //   });
// // });
