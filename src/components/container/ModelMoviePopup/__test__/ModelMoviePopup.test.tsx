import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import ModelMoviePopup from '../ModelMoviePopup';

import { render, screen, fireEvent, act, RenderOptions, waitFor } from '@testing-library/react';
import {
    FETCH_ADD_MOVIE_SUCCESS,
  MoviesActionTypes,
  UPDATE_MOVIE_SUCCESS,
  UPDATE_STATUS_MOVIE_POPUP,
} from '../../../../redux/types/movies-reducer-types';
import { IMovie } from '../../../../helpers/interface';
import { Simulate } from "react-dom/test-utils";
// eslint-disable-next-line import/no-duplicates
import userEvent from '@testing-library/user-event';
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
  fetchAddMovie: (movie: IMovie): MoviesActionTypes => {
    return {
      type: FETCH_ADD_MOVIE_SUCCESS,
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
  let container: Element 
    | DocumentFragment 
    | RenderOptions<typeof import('@testing-library/dom/types/queries'), HTMLElement>
    | null;
  const movie = {
    id: 12345,
    title: 'film title',
    release_date: '2020-01-02',
    poster_path: 'https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg',
    genres: ['crime'],
    overview: 'overview',
    runtime: 66,
  };
  
  afterEach(() => {
    container = null;
    jest.clearAllMocks();
  });

//   test('render edit model', async () => {
//     container = render(<div></div>);
//     const store = mockStore(initialState);

//     container = render(<Provider store={store}>
//         <ModelMoviePopup movie={movie} closePopup={closePopup} role="edit" />
//     </Provider>,);
    
//     expect(container.baseElement).toMatchSnapshot();
//     expect(screen.getByRole('button', { name: /SAVE/i })).toBeInTheDocument();
//   });

//   test('render add model', async () => {
//     container = render(<div></div>);
//     const store = mockStore(initialState);

//     container = render(
//         <Provider store={store}>
//             <ModelMoviePopup closePopup={closePopup} role="add" />
//         </Provider>,);
    
//     expect(container.baseElement).toMatchSnapshot();
//     expect(screen.getByRole('button', { name: /SUBMIT/i })).toBeInTheDocument();
//   });

//   test('closeEditPopup function', () => {
//     const store = mockStore(initialState);
//     render(
//         <Provider store={store}>
//             <ModelMoviePopup closePopup={closePopup} role="add" />
//         </Provider>,);

//     const expectedActions = [{ type: 'UPDATE_STATUS_MOVIE_POPUP', payload: false }];

//     fireEvent.click(screen.getByRole('button', { name: '' }));
//     expect(closePopup).toBeCalled();
//     expect(store.getActions()).toEqual(expectedActions);
//   });

//   test('handleSubmitEdit function', async () => {
//     const promise = Promise.resolve();
//     container = render(<div></div>);
//     const store = mockStore(initialState);

//     act(() => {
//         container = render(<Provider store={store}>
//             <ModelMoviePopup movie={movie} closePopup={closePopup} role="edit" />
//         </Provider>,);
//     });

//     act(() => {
//         fireEvent.click(screen.getByRole('button', { name: 'SAVE' }));
//     });

//     const expectedActions = [
//       { type: 'UPDATE_MOVIE_SUCCESS', payload: movie },
//       { type: 'UPDATE_STATUS_MOVIE_POPUP', payload: false },
//     ];
    
//     await act(() => promise);

//     await waitFor(() => {
//         expect(store.getActions()).toEqual(expectedActions);
//         expect(closePopup).toBeCalled();
//     });
//   });

  test('handleSubmitAdd function', async () => {
    const promise = Promise.resolve();
    container = render(<div></div>);
    const store = mockStore(initialState);
    const movieSubmit = {
        title: 'film title',
        release_date: "2021-04-30",
        poster_path: 'https://image.tmdb.org/3kcEGBH.jpg',
        genres: ['Action', 'Adventure'],
        overview: 'overview',
        runtime: 77,
        budget: 0,
        revenue: 0,
        tagline: undefined,
        vote_average: 0,
        vote_count: 0,
      };

    act(() => {
        container = render(<Provider store={store}>
            <ModelMoviePopup closePopup={closePopup} role="add" />
        </Provider>,);
    });

    userEvent.type(screen.getByRole('textbox', { name: 'TITLE' }), "film title");
    userEvent.type(screen.getByRole('textbox', { name: 'OVERVIEW' }), "overview");
    userEvent.type(screen.getByRole('spinbutton', { name: 'RUNTIME' }), '77');
    userEvent.type(screen.getByRole('textbox', { name: 'POSTER URL' }),
            "https://image.tmdb.org/3kcEGBH.jpg");
    
    userEvent.click(screen.getByRole('img'));
    fireEvent.click(screen.getByRole('button', { name: 'Choose Friday, April 30th, 2021' }));

    // fireEvent.click(screen.getByRole('Select Genre'));

    // userEvent.click(screen.getByRole('textbox', { name: 'GENRE Select Genre' }));
    // userEvent.selectOptions(screen.getByRole('checkbox', { name: 'Action'}), 'datatype');
 
    // const input = screen.getByRole('checkbox', { name: 'Action'});
        // fireEvent.change(screen.getByRole('checkbox', { name: 'Action'}), {
        //     target: { setChecked: true },
        // });
        // fireEvent.change(screen.getByLabelText('Action', { selector: 'input' }), {
        //     target: {datatype: true}
        //   });
        // fireEvent.change(screen.getByLabelText('Action', { selector: 'input' }), {
        //     checked: 'true',
        // });  
        // const keyDownEvent = {
        //     key: 'Enter',
        // };
        // fireEvent.keyDown(screen.getByRole('checkbox', { name: 'Action'}), keyDownEvent);

    // userEvent.click(screen.getByRole('checkbox', { name: 'Action'}));
    
    // fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    // userEvent.click(screen.getByLabelText('Action', { selector: 'input' }));

    
    // userEvent.click(screen.getByRole('textbox', { name: 'GENRE Select Genre' }));
    // userEvent.click(screen.getByLabelText('Action'));
    // userEvent.click(screen.getByRole('textbox', { name: 'GENRE Select Genre' }));
    // fireEvent.click(screen.getByLabelText('Drama'));
    // fireEvent.click(screen.getByLabelText('Adventure'));
    // userEvent.click(screen.getByLabelText('Action', { selector: 'input'}, { name: 'Action' }));

    // userEvent.click(screen.getByLabelText('Select Genre'));

    // fireEvent.click(screen.getByDisplayValue('Select Genre'));

    // screen.getByDisplayValue('15');
    // eslint-disable-next-line max-len
    // userEvent.click(screen.getByLabelText('Choose Saturday, May 15th, 2021', { selector: 'input' }));
    // userEvent.click(screen.getByLabelText('Choose Saturday, May 15th, 2021'));
    // userEvent.type(screen.getByLabelText(/RELEASE DATE/i), "2007-12-18");
    // fireEvent.change(screen.getByRole('input', { name: 'RELEASE DATE' }), {
    //     target: { value: "2017-12-18" },
    // });  
    
    // fireEvent.change(screen.getByRole('textbox', { name: 'GENRE Select Genre' }), {
    //     target: { value: ["crime"] },
    // });
    // fireEvent.change(screen.getByLabelText(/RELEASE DATE/i), {
    //             target: { value: "2017-12-18" },
    //         });
    
    userEvent.click(screen.getByRole('textbox', { name: 'GENRE Select Genre' }));
    // userEvent.click(screen.getByText('Action'));
    // userEvent.click(screen.getByText('Adventure'));

// userEvent.hover(screen.getByLabelText('Action'));
// userEvent.selectOptions(screen.getByLabelText('Action'), datatype);
// userEvent.keyboard('Action');

    act(() => {
       Simulate.click(screen.getByText('Action'));
       Simulate.click(screen.getByText('Adventure'));
       


    // fireEvent.focus(screen.getByLabelText('Action'));
    // fireEvent.click(screen.getByLabelText('Action'));
    // fireEvent.focusOut(screen.getByLabelText('Action'));

    // fireEvent.focus(screen.getByLabelText('Adventure'));
    // fireEvent.click(screen.getByLabelText('Adventure'));
    // fireEvent.focusOut(screen.getByLabelText('Adventure'));

    // fireEvent.focus(screen.getByLabelText('Adventure'));
    // fireEvent.click(screen.getByLabelText('Adventure'));


    // fireEvent.keyDown(screen.getByLabelText('Action'), {key: 'Enter'});
    // fireEvent.keyDown(screen.getByLabelText('Adventure'), {key: 'Enter'});
    });
    expect(container.baseElement).toMatchSnapshot();
    // fireEvent.click(screen.getByRole('textbox', { name: 'GENRE Select Genre' }));
    // act(() => {
        // fireEvent.keyDown(screen.getByLabelText('Adventure'), {key: 'Enter'});
    // fireEvent.focus(screen.getByLabelText('Action'));
    // fireEvent.click(screen.getByLabelText('Action'));
    // fireEvent.focusOut(screen.getByLabelText('Action'));

    // fireEvent.focus(screen.getByLabelText('Adventure'));
    // fireEvent.click(screen.getByLabelText('Adventure'));
    // fireEvent.focusOut(screen.getByLabelText('Adventure'));

    // fireEvent.focus(screen.getByLabelText('Adventure'));
    // fireEvent.click(screen.getByLabelText('Adventure'));


    // fireEvent.keyDown(screen.getByLabelText('Action'), {key: 'Enter'});
    // fireEvent.keyDown(screen.getByLabelText('Adventure'), {key: 'Enter'});
    // });

    // act(() => {
    //     userEvent.click(screen.getByRole('textbox', { name: 'GENRE Select Genre' }));
    //     fireEvent.focusIn(screen.getByLabelText('Adventure'));
    //     fireEvent.click(screen.getByLabelText('Adventure'));
    //     fireEvent.focusOut(screen.getByLabelText('Adventure'));
    
    //     // fireEvent.keyDown(screen.getByLabelText('Action'), {key: 'Enter'});
    //     // fireEvent.keyDown(screen.getByLabelText('Adventure'), {key: 'Enter'});
    //     });

    
        // fireEvent.keyDown(screen.getByLabelText('Action'), {key: 'ArrowDown'});
        // fireEvent.focus(screen.getByLabelText('Adventure'));
        // fireEvent.focusIn(screen.getByLabelText('Adventure'));

        // fireEvent.keyDown(screen.getByLabelText('Adventure'), {key: 'Enter'});

    
    act(() => {
        
        
        
        fireEvent.click(screen.getByRole('button', { name: 'SUBMIT' }));
    });
    
    const expectedActions = [
      { type: 'FETCH_ADD_MOVIE_SUCCESS', payload: movieSubmit },
    ];   
    await act(() => promise);
    await waitFor(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(closePopup).toBeCalled();
    });
  });
});
