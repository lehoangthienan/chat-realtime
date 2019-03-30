import {REQUEST_LIST_CHAT, LIST_CHAT_FETCH_FAIL, LIST_CHAT_FETCH_SUCCESSFULL, LIST_CHAT_HANDLE_ERROR} from '../constants/list_chat'

const initialState = {
    isLoading: false,
    chats: [],
    error: null
}

export const chatData = (state = initialState, action) => {
    switch(action.type){
    case REQUEST_LIST_CHAT:
        return {
            ...state,
            isLoading: true
        }
    case LIST_CHAT_FETCH_SUCCESSFULL:
        return {
            ...state,
            isLoading: false,
            chats: action.chats
        }
    case LIST_CHAT_FETCH_FAIL:
        return {
            ...state,
            isLoading: false,
            error: action.error
        }
    case LIST_CHAT_HANDLE_ERROR:
        return {
            ...state,
            error: null
        }
    default:
        return state
    }
}