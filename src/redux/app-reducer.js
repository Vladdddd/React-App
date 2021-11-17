import { getAuth } from "./auth-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED'; //Константа, ключ - тип у объекта action

let initialState = {// "Стартовый"/ инициализационный/ начальный state
    initialized: false
};

const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: true
            };
        }

        default:
            return state;
    }
}

export const initializedSuccess = () => ({ type: SET_INITIALIZED })//функция, создающая action - action creator

export const initializeApp = () => (dispatch) => {//функция, создающая thunk - thunk creator
    let promise = dispatch(getAuth());//диспатчит в store thunk'у  
    
    promise.then (() => {
        dispatch(initializedSuccess());// когда пришел промис, диспатчит thunk'у в store
    })
}

export default appReducer;