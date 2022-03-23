import profileReducer, { actions, InitialStateType } from "./profile-reducer";

let state: InitialStateType 

beforeEach(() => {
    state = {
        posts: [
            { id: 1, mess: 'Hello, new user. I love you', name: 'Griforii', age: 54 },
            { id: 2, mess: 'Hey, bro', name: 'Artemon', age: 21 }
        ],
    
        newPostText: 'it-genius',
        profile: {
            userId: 1,
            lookingForAJob: "",
            lookingForAJobDescription: "",
            fullName: "1",
            contacts: {github: "", vk: "",facebook: "", instagram: "" ,twitter: ""  ,website: "" ,youtube: "" ,mainLink: ""},
            photos: {small: null, large: null},
            aboutMe: ""
        },
        fullnes: 0,
        status: '',
        temporarilyForFriends: 'Andrii'
    }
})

test('length of posts should be incremented', () => {    
    let action = actions.addPostActionCreator("testText");
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
});

test('text of posts should be correct', () => {    
    let action = actions.addPostActionCreator("testText");
    let newState = profileReducer(state, action);

    expect(newState.posts[2].mess).toBe("testText");
});

test('after deleting length of messages should be decrement', () => {    
    let action = actions.deletePost(1);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(1);
});
