import { useEffect, useReducer } from 'react';
import { AppRouter } from './routers/AppRouter';
import { AuthContext } from './components/context/AuthContext';
import { authReducer } from './reducers/authReducer';
import { GlossaryContext } from './components/context/GlossaryContext';
import { glossaryReducer } from './reducers/glossaryReducer';
import { glossaryTypes } from './types/glossaryTypes';


const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged: false }
}

const initGlossary = () => {
  return JSON.parse(localStorage.getItem('glossary')) || [];
};

function App() {

  const [user, dispatch] = useReducer(authReducer, {}, init);
  const [glossary, dispatchG] = useReducer(glossaryReducer, [], initGlossary);

  useEffect(() => {
    if (glossary?.length < 1) {
      return;
    }
    localStorage.setItem('glossary', JSON.stringify(glossary));
  }, [glossary]);

  // Se encarga de escuchar los cambios del user y de grabar el localstorage dichos cambios
  useEffect(() => {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));

  }, [user]);


  const setInitialState = (arrWords) => {
    dispatchG({
      payload: arrWords
    })
  }

  // Funciones Globales para el CRUD
  const addWord = (word) => {
    dispatchG({
      type: glossaryTypes.addWord,
      payload: word
    });
  }

  const editWord = (word) => {
    dispatchG({
      type: glossaryTypes.editWord,
      payload: word
    });
  }

  const removeWord = (id) => {
    dispatchG({
      type: glossaryTypes.deleteWord,
      payload: id
    });
  }

  const clearGlossary = () => {
    dispatchG({
      type: glossaryTypes.clearGlossary
    });
  }



  return (

    <AuthContext.Provider value={{
      user, dispatch
    }}>
      <GlossaryContext.Provider value={{
        glossary,
        setInitialState,
        addWord,
        editWord,
        removeWord,
        clearGlossary
      }}>
        <AppRouter />
      </GlossaryContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
