
const inititalState = {
    token:[],

}

const SET_TOKEN = 'SET_TOKEN';

export function setToken(token){
    console.log(token)
    return{
        type: SET_TOKEN,
        payload: token

    }
}

export default function  reducer(state = inititalState, action){
const {type, payload} = action
    switch (type) {
        case SET_TOKEN:
            return {...state, payload}
        default:
            return state
    }
}