import * as ActionTypes from './ActionTypes';

export const campsites = (state = { isLoading: true,
                                     errMess: null,
                                     campsites: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload};

        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []}

        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};

//This module imports all the action types. Then it exports the campsites reducer which takes the campsites section of the state and initalizes it with the default funtion parameters syntax if it hasn't already been initialized.

//Then it takes the action that was dispatched to it and depending on what that action is it creates and returns a new state or if none of the actions matched then it just returns the previous state.