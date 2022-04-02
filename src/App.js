import { useEffect, useReducer } from 'react';
import { AuthContext } from './components/context/AuthContext';
import { authReducer } from './reducers/authReducer';
import { AppRouter } from './routers/AppRouter';

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged: false }
}

function App() {

  const [user, dispatch] = useReducer(authReducer, {}, init);

  // Se encarga de escuchar los cambios del user y de grabar el localstorage dichos cambios
  useEffect(() => {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));
  }, [user])

  return (

    <AuthContext.Provider value={{
      user,
      dispatch
    }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
