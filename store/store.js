import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
  availableTables: [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
  availableYears: [2016, 2017, 2018, 2019, 2020],
  year: new Date().getFullYear(),
  table: 33,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_YEAR':
      return {
        ...state,
        year: action.payload,
      };
    case 'SET_TABLE':
      return {
        ...state,
        table: action.payload,
      };
    default:
      return state;
  }
};

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
};
