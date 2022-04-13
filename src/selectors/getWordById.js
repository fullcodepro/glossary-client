
export const getWordById = (glossary, id) => {
    return glossary.find( word => word._id === id);
};