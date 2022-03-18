import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ResultCodesEnum} from "../api/api";
import { usersAPI } from "../api/users-api";
import { updateObjectInArray } from "../components/utils/object-helpers";
import { UserType } from "../types/types";
import { InferActionsTypes, AppStateType } from "./redux-store";


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> //array of user ids
}

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            };

        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            };

        case 'SN/USERS/SET_USERS':
            return { ...state, users: action.users }

        case 'SN/USERS/SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }

        case 'SN/USERS/SET_TOTAL_COUNT':
            return { ...state, totalUsersCount: action.totalCount }

        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }

        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state;
    }

}

export const actions = {
    acceptFollow: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId } as const),
    acceptUnfollow: (userId: number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (totalCount: number) => ({ type: 'SN/USERS/SET_TOTAL_COUNT', totalCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize);

        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (
        dispatch: DispatchType,
        userId: number,
        apiMethod: any,
        actionCreator: (userId: number) => ActionsType) => {

    dispatch(actions.toggleFollowingProgress(true, userId));

    let data = await apiMethod(userId);

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.postFollow.bind(usersAPI), actions.acceptFollow);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.deleteFollow.bind(usersAPI), actions.acceptUnfollow);
    }
}

export default usersReducer;


/* Types */

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>