const initialState = {
    user: {},//User who is currently logged in
    music: {} //music we are going to move from chat to audio
   
}

const GET_USER = 'GET_USER'
const GET_MUSIC = 'GET_MUSIC'


///Get music that is passed from chat
export function getMusic(music) {
    console.log(music)

    return {
        type: GET_MUSIC,
        payload: music
    }
}


//Get current user who is logged into session
export function getUser(user) {

    return {
        type: GET_USER,
        payload: user
    }
}






export default function reducer(state = initialState, action) {
    const {type, payload} = action

    switch(type){
        case GET_USER:
            return {...state, user: payload}

            case GET_MUSIC:
                return {...state, music: payload}
                
            default:
                return state
    }
}