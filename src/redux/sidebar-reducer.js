let initialState = {
    friends: [
        { id: 1, name: 'Artemon', country: 'USA', age: 28 },
        { id: 2, name: 'Balton', country: 'Nigeria', age: 18 },
        { id: 3, name: 'Vasyka', country: 'Russia', age: 34 }
    ]
}

const sidebarReducer = (state = initialState, action) => {

    return state;
}

export default sidebarReducer;