import { auth } from "../utils/firebase";
const { createContext, useContext, useState, useEffect } = require("react");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("../utils/firebase");

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    // return auth.signInWithEmailAndPassword(email, password);
    // return createUserWithEmailAndPassword(auth, email, password);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    signup,
    login,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
