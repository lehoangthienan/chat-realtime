import {REQUEST_LIST_CHAT, LIST_CHAT_FETCH_SUCCESSFULL, LIST_CHAT_FETCH_FAIL, LIST_CHAT_HANDLE_ERROR} from '../constants/list_chat'
import {getAllChat} from '../../../api/ChatAPI'

export function requestListChat(){
    return {
        type: REQUEST_LIST_CHAT,
    }
}

export function fetchSuccessfully(chats){
    return {
        type: LIST_CHAT_FETCH_SUCCESSFULL,
        chats
    }
}

export function fetchError(error){
    return {
        type: LIST_CHAT_FETCH_FAIL,
        error
    }
}

export function handeError(){
    return {
        type: LIST_CHAT_HANDLE_ERROR,
    }
}

export function getListChats(){
    return (dispatch)=>{
        dispatch(requestListChat())

        getAllChat()
        .then(chats=>{
            dispatch(fetchSuccessfully(chats))
        })
        .catch(err=>dispatch(fetchError(err)))
    }
}