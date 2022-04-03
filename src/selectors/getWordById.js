
export const getWordById = (glossary, id) => {
    return glossary.find( hero => hero.id === id);
};