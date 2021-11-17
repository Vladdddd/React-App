import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";

let state = {
    posts: [
        { id: 1, mess: 'Hello, new user. I love you', name: 'Griforii', age: 54 },
        { id: 2, mess: 'Hey, bro', name: 'Artemon', age: 21 }
    ]
};

test('length of posts should be incremented', () => {    
    let action = addPostActionCreator("testText");
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
});

test('text of posts should be correct', () => {    
    let action = addPostActionCreator("testText");
    let newState = profileReducer(state, action);

    expect(newState.posts[2].mess).toBe("testText");
});

test('after deleting length of messages should be decrement', () => {    
    let action = deletePost(1);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(2);
});
