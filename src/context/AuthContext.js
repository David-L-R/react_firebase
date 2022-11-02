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
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password);
    setLoading(false);
  };

  const login = async (email, password) => {
    // return auth.signInWithEmailAndPassword(email, password);
    // return createUserWithEmailAndPassword(auth, email, password);
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
    setLoading(false);
  };

  const signout = async () => {
    setLoading(true);
    await auth.signOut();
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    signup,
    login,
    signout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
