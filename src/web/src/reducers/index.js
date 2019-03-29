import { combineReducers } from "redux";
import {loginData} from "../screens/auth/reducers/signin"
import {signupData} from "../screens/auth/reducers/signup"


import {memberData} from "../screens/list_members/reducers/list_member"

export default combineReducers({
    loginData,
    signupData,

    memberData,
});