import { glossaryTypes } from "../types/glossaryTypes";

const {
    deleteWord,
    addWord,
    editWord,
    clearGlossary
} = glossaryTypes;

export const glossaryReducer = (state = [], action = '') => {
    switch (action.type) {
        case deleteWord:
            return state.filter(word => word.id !== action.payload).sort();
        case addWord:
            return [...state, action.payload].sort();
        case editWord:
            return state.map(word => {
                if (word.id === action.payload) { return word = action.payload } return word
            }).sort()
        case clearGlossary:
            return [];
        default:
            return action.payload;
    }
}