import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
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
  const [userInfo, setUserInfo] = useState();
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

  const getUserInfo = async (user) => {
    const colRef = collection(db, "users");
    const q = query(colRef, where("id", "==", user.uid));
    const snapShot = await getDocs(q);
    const docs = snapShot.docs.map((doc) => doc.data());
    const [userInfo] = docs;
    setUserInfo({ name: userInfo.name });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      getUserInfo(user);
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    userInfo,
    signup,
    login,
    signout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
