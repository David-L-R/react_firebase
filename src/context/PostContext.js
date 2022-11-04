import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../utils/firebase";
const { createContext, useContext, useState, useEffect } = require("react");

const PostContext = createContext();

const usePost = () => {
  return useContext(PostContext);
};

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    try {
      const docsSnap = await getDocs(collectionRef, orderBy("timeStamp"));
      const docs = [];
      docsSnap.forEach((doc) => {
        docs.push({
          ...doc.data(),
          date: new Date(doc.data().timeStamp.seconds * 1000),
        });
      });
      setPosts(docs);
    } catch (err) {
      console.log(err);
    }
  };

  // get user's blogs

  // add a post
  const addPost = async (post, userUid) => {
    const collectionRef = collection(db, "posts");
    try {
      return await addDoc(collectionRef, {
        ...post,
        timeStamp: serverTimestamp(),
        user: userUid,
      });
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  };

  // edit a blog

  // remove a blog

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  const value = {
    getPosts,
    addPost,
    posts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export { PostProvider, usePost };
