import { FriendType } from "../../types/types";

let initialState = {
    friends: [
        { id: 1, name: 'Artemon', country: 'USA', age: 28 },
        { id: 2, name: 'Balton', country: 'Nigeria', age: 18 },
        { id: 3, name: 'Vasyka', country: 'Russia', age: 34 }
    ] as Array<FriendType>
}

type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state;
}

export default sidebarReducer;