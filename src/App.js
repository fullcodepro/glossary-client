import { useEffect, useReducer } from 'react';
import { AuthContext } from './components/context/AuthContext';
import { GlossaryContext } from './components/context/GlossaryContext';
import { authReducer } from './reducers/authReducer';
import { glossaryReducer } from './reducers/glossaryReducer';
import { AppRouter } from './routers/AppRouter';


const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged: false }
}

const initGlossary = () => {
  const arr = [];
  return JSON.parse(localStorage.getItem('glossary')) || arr;
};

function App() {

  const [user, dispatch] = useReducer(authReducer, {}, init);
  const [glossary, dispatchGlossary] = useReducer(glossaryReducer, [], initGlossary);

  useEffect(() => {
    if(glossary.length < 1){ 
      return;
    }
    localStorage.setItem('glossary', JSON.stringify(glossary));
  }, [glossary]);

  // Se encarga de escuchar los cambios del user y de grabar el localstorage dichos cambios
  useEffect(() => {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (


    <AuthContext.Provider value={{
      user, dispatch
    }}>
      <GlossaryContext.Provider value={{
        glossary, dispatchGlossary
      }}>
        <AppRouter />
      </GlossaryContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
