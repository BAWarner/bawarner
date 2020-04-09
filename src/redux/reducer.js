import axios from "axios";

const initialState = {
    user_id: null,
    username: '',
    password: '',
    profile_picture: '',
    user: {},
    posts: [],
    loading: false
}

const UPDATE_STATE = 'update_state';
const LOGIN_USER = 'LOGIN_USER';
const REGISTER_USER = 'REGISTER_USER';
const RETRIEVE_USER = 'RETRIEVE_USER';
const GET_ALL_POSTS = 'GET_ALL_POSTS';

export const updateState = e => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}

export const loginUser = (username, password) => {
    let body = {
        username,
        password
    }
    return{
        type: LOGIN_USER,
        payload: axios.post('/auth/login', body)
    }
}

export const registerUser = (username, password) => {
    let body = {
        username,
        password
    }
    return{
        type: REGISTER_USER,
        payload: axios.post('/auth/register', body)
    }
}
export const retrieveUser = () => {
    return{
        type: RETRIEVE_USER,
        payload: axios.get('/auth/retrieveUser')
    }
}

export const getAllPosts = () => {
    return{
        type: GET_ALL_POSTS,
        payload: axios.get('/api/posts')
    }
}

const authReducer = ( state = initialState, action ) => {
    let { type, payload } = action;
    switch(type){
        case UPDATE_STATE:
            return{
                ...state,
                ...payload
            }
        case `${LOGIN_USER}_PENDING`:
            return{
                ...state,
                loading: true
            };
        case `${LOGIN_USER}_FULFILLED`:
            return{
                ...state,
                loading: false,
                user: payload.data
            }; 
        case `${REGISTER_USER}_PENDING`:
            return{
                ...state,
                loading: true
            };
        case `${REGISTER_USER}_FULFILLED`:
            return{
                ...state,
                loading: false,
                user: payload.data
            };
            
        case `${RETRIEVE_USER}_PENDING`:
            return{
                ...state,
                loading: true
            }
        case `${RETRIEVE_USER}_FULFILLED`:
            return{
                ...state,
                loading: false,
                user: payload.data
            }
        case `${GET_ALL_POSTS}_PENDING`:
            return{
                ...state,
                loading: true
            }
        case `${GET_ALL_POSTS}_FULFILLED`:
            return{
                ...state,
                loading: false,
                posts: payload.data
            }
        default: return state;
    }
}

export default authReducer;
