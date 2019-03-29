import config from '../config'
import {getHeaders} from '../utils/common'

export function getChatBySender(userID) {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/chats/sender/'+ userID, {
            headers: getHeaders(),
        })
        .then(res => res.json())
        .then(resJSON=>{
            if (resJSON.status === 0) {
                return reject(resJSON.error.message)
            }

            resolve(resJSON.result)
        })
        .catch(err=>reject(err))
    })
}

export function getChatByReceiver(userID) {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/chats/receiver/'+ userID, {
            headers: getHeaders(),
        })
        .then(res => res.json())
        .then(resJSON=>{
            if (resJSON.status === 0) {
                return reject(resJSON.error.message)
            }

            resolve(resJSON.result)
        })
        .catch(err=>reject(err))
    })
}

export function getAllChat() {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/chats', {
            headers: getHeaders(),
        })
        .then(res => res.json())
        .then(resJSON=>{
            if (resJSON.status === 0) {
                return reject(resJSON.error.message)
            }

            resolve(resJSON.result)
        })
        .catch(err=>reject(err))
    })
}

export function createChat(sender, receiver, content) {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/chats', {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({
                chat: {sender, receiver, content}
            }),
        })
        .then(res => res.json())
        .then(resJSON=>{
            if (resJSON.status === 0) {
                return reject(resJSON.error.message)
            }

            resolve(resJSON.result)
        })
        .catch(err=>reject(err))
    })
}

export function deleteChat(chatID) {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/chats/'+chatID, {
            method: "DELETE",
            headers: getHeaders(),
        })
        .then(res => res.json())
        .then(resJSON=>{
            if (resJSON.status === 0) {
                return reject(resJSON.error.message)
            }

            resolve(resJSON.result)
        })
        .catch(err=>reject(err))
    })
}

export function updateChat(chat) {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/chats/' + chat._id, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify({
                chat: {content: chat.content}
            }),
        })
        .then(res => res.json())
        .then(resJSON=>{
            if (resJSON.status === 0) {
                return reject(resJSON.error.message)
            }

            resolve(resJSON.result)
        })
        .catch(err=>reject(err))
    })
}