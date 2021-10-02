import { SET_USER_EMAIL, SET_USER_NAME, SET_USER_PASSWORD } from "./actionTypes"

export const setUserName = usr_name => {
    return {
        type : SET_USER_NAME,
        payload : usr_name
    }
}

export const setUserEmail = usr_email => {
    return {
        type : SET_USER_EMAIL,
        payload : usr_email
    }
}

export const setUserPassword = pwd => {
    return {
        type : SET_USER_PASSWORD,
        payload : pwd
    }
}

