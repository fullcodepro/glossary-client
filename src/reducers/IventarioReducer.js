
// const initialState = {}

import { ToastBody } from "react-bootstrap";

export const IventarioReducer = (state, action) => {

    switch (action.type) {
        case 'delete':
           return state.filter( inventario => inventario._id !== action.payload )
        case 'add':
            return [...state, action.payload ]
        case 'edit':
        return state;
    }

    return action.state;
}
 