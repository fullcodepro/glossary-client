import { types } from "../types/types";



export const authReducer = (state = {}, action) => {

    switch (action.types) {
        case types.login:
            return {
                ...action.payload,
                logged: true
            };

        case types.logout:
            return {
                logged: false
            }

        default:
            return state;
    }

};