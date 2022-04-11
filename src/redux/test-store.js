import dialogsReducer from "./dialogs/dialogs-reducer";
import profileReducer from "./profile/profile-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, mess: 'Hello, new user. I love you', name: 'Griforii', age: 54 },
                { id: 2, mess: 'Hey, bro', name: 'Artemon', age: 21 }
            ],
            newPostText: 'it-genius'
        },

        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Dmytro' },
                { id: 2, name: 'Andrew' },
                { id: 3, name: 'Ostap' },
                { id: 4, name: 'Gacher' },
                { id: 5, name: 'Valen' }
            ],

            messages: [
                { id: 1, mess: 'Hey <3' },
                { id: 2, mess: 'How are you' },
                { id: 3, mess: 'Yo' },
                { id: 4, mess: 'What are you doing, broy' },
                { id: 5, mess: 'Nice to meet you' }
            ],

            newMessageText: ''
        },

        sitebar: {
            friends: [
                { id: 1, name: 'Artemon', country: 'USA', age: 28 },
                { id: 2, name: 'Balton', country: 'Nigeria', age: 18 },
                { id: 3, name: 'Vasyka', country: 'Russia', age: 34 }
            ]
        }
    },

    _callSubscriber() {
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },


    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action); 
        this._callSubscriber(this._state);
    }
}




export default store;