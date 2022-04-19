import { glossaryTypes } from "../types/glossaryTypes";

const {
    deleteWord,
    addWord,
    editWord,
    clearGlossary,
    search
} = glossaryTypes;

export const glossaryReducer = (state = [], action = '') => {
    switch (action?.type) {
        case deleteWord:
            const arr1 = state.filter(word => word._id !== action.payload);
            return arr1.sort();
        case addWord:
            const arr2 = [...state, action.payload];
            return arr2.sort();
        case editWord:
            const arr3 = state.map(word => {
                if (word._id === action.payload._id) { word = action.payload; return word }; return word;
            })
            return arr3.sort()
        case clearGlossary:
            return [];
        case search:
            const arr4 = state.map( word => (word.wordName.includes(action.payload) && word));
            return arr4.sort();
        default:
            return action.payload;
    }
};
