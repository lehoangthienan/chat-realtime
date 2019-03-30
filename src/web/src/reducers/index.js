import { combineReducers } from "redux";
import {loginData} from "../screens/auth/reducers/signin"
import {signupData} from "../screens/auth/reducers/signup"


import {userData} from "../screens/list_users/reducers/list_user"

import {chatData} from "../screens/chat/reducers/list_chat"

export default combineReducers({
    loginData,
    signupData,

    userData,
    chatData,
});