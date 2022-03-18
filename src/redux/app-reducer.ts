import { getAuth } from "./auth-reducer";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {// "Стартовый"/ инициализационный/ начальный state
    initialized: false
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/APP/SET_INITIALIZED': { //В JS, если не делать константы - можно ошибиться. В ts ошибиться нельзя(ts подсказывает и выводит ошибку)
            return {
                ...state,
                initialized: true
            };
        }

        default:
            return state;
    }
}

const actions = {
    initializedSuccess: () => ({ type: 'SN/APP/SET_INITIALIZED' } as const)
}

export const initializeApp = (): ThunkType => (dispatch) => {//функция, создающая thunk - thunk creator
    let promise = dispatch(getAuth());//диспатчит в store thunk'у  

    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess());// когда пришел промис, диспатчит thunk'у в store
        })
}

export default appReducer;


/*Types*/

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType, void>