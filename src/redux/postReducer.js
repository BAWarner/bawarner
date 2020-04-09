import axios from 'axios';

const initialState = {
    posts: [],
    search: '',
    userposts: true,
    loading: false
}

const UPDATE_STATE = 'UPDATE_STATE';
const HANDLE_RESET = 'HANDLE_RESET';
const TOGGLE_USER_POSTS = 'TOGGLE_USER_POSTS';
const GET_ALL_POSTS = 'GET_ALL_POSTS';
const GET_FILTERED_POSTS = 'GET_FILTERED_POSTS';

export const updateState = e => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}
export const handleReset = () => {
    return{
        type: HANDLE_RESET,
        payload: axios.get('/api/posts')
    }
}

export const toggleUserPosts = () => {
    return{
        type: TOGGLE_USER_POSTS
    }
}

export const getAllPosts = () => {
    return{
        type: GET_ALL_POSTS,
        payload: axios.get('/api/posts')
    }
}

export const getFilteredPosts = (user_id = null, query = '', userposts = true) => {
    return{
        type: GET_FILTERED_POSTS,
        payload: axios.get(`/api/posts/${user_id}?search=${query}&userposts=${userposts}`)
    }
}


const postReducer = ( state = initialState, action ) => {
    let { type, payload } = action;
    switch(type){
        case UPDATE_STATE:
            return{
                ...state,
                ...payload
            }
        case TOGGLE_USER_POSTS:
            return{
                ...state,
                userposts: !state.userposts
            }
        case HANDLE_RESET:
            return{
                ...state,
                userposts: true,
                search: '',
                posts: payload.data
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
        case `${GET_FILTERED_POSTS}_PENDING`:
            return{
                ...state,
                loading: true
            }
        case `${GET_FILTERED_POSTS}_FULFILLED`:
            return{
                ...state,
                loading: false,
                posts: payload.data
            }
        default: return state;
    }
}

export default postReducer;