import usersReducer, { actions, InitialStateType } from "./users-reducer"

let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'U1', followed: false, photos: {small: null, large: null}, 
            status: "status 0", country: "C1"},
            {id: 1, name: 'U2', followed: false, photos: {small: null, large: null}, 
            status: "status 1", country: "C2"},
            {id: 2, name: 'U3', followed: true, photos: {small: null, large: null}, 
            status: "status 2", country: "C3"},
            {id: 3, name: 'U4', followed: true, photos: {small: null, large: null}, 
            status: "status 3", country: "C4"},
        ],
        pageSize: 100,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [], //array of user ids
        filter: {
            term: '',
            friend: null as null | boolean
        }
    }
})



test("follow success", () => {
    const newState = usersReducer(state, actions.acceptFollow(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
}) 

test("unfollow success", () => {
    const newState = usersReducer(state, actions.acceptUnfollow(2))

    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()
}) 