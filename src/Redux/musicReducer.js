const initialState = {
    user: {}//User who is currently logged in
}

const GET_USER = 'GET_USER'

//Get current user who is logged into session
export function getUser(user) {

    return {
        type: GET_USER,
        payload: user
    }
}