import { NewsType, TopNewsType } from "../types/types";


let initialState = {
    news: [
        { id: 1, name: 'Andrew Corp', news: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam voluptates at, nostrum alias dolore autem minus dicta voluptatibus corporis et aspernatur porro error laboriosam aut iure ad quibusdam nulla! Voluptatibus.', role: 'Organizator', time: 'October 15, 2021 at 6:15 pm', photo: null },
        { id: 2, name: 'Gustav', news: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam voluptates at, nostrum alias dolore autem minus dicta voluptatibus corporis et aspernatur porro error laboriosam aut iure ad quibusdam nulla! Voluptatibus.', role: 'Administrator', time: 'October 15, 2021 at 6:15 pm', photo: null },
        { id: 3, name: 'Ostap', news: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam voluptates at, nostrum alias dolore autem minus dicta voluptatibus corporis et aspernatur porro error laboriosam aut iure ad quibusdam nulla! Voluptatibus.', role: 'User', time: 'October 15, 2021 at 6:15 pm', photo: null  },
        { id: 4, name: 'Gacher', news: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam voluptates at, nostrum alias dolore autem minus dicta voluptatibus corporis et aspernatur porro error laboriosam aut iure ad quibusdam nulla! Voluptatibus.', role: 'User', time: 'October 15, 2021 at 6:15 pm', photo: null  },
        { id: 5, name: 'Valen', news: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam voluptates at, nostrum alias dolore autem minus dicta voluptatibus corporis et aspernatur porro error laboriosam aut iure ad quibusdam nulla! Voluptatibus.', role: 'Vip person', time: 'October 15, 2021 at 6:15 pm', photo: null  }
    ] as Array<NewsType>,
    topNews : [
        { id: 1, name: 'Paulino Papuchi', caption: 'In your opinion, who has the best human?', time: '30 mins ago'},
        { id: 2, name: 'Paulino Papuchi', caption: `It's the best time`, time: '2 hours ago'},
        { id: 2, name: 'Paulino Papuchi', caption: `Grats! I'm done`, time: '3 hours ago'}
    ] as Array<TopNewsType>
}

type InitialStateType = typeof initialState

const newsReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {

        default:
            return state;
    }

}



export default newsReducer;