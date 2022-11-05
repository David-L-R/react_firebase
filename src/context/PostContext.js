import {
  doc,
  addDoc,
  collection,
  getDoc,
  getDocs,
  orderBy,
  serverTimestamp,
  where,
  query,
  documentId,
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
      const docsSnap = await getDocs(
        collectionRef,
        orderBy("description", "desc")
      );
      const docs = [];
      docsSnap.forEach(async (doc) => {
        docs.push({
          ...doc.data(),
          date: new Date(doc.data().timeStamp.seconds * 1000),
        });
      });

      const docsWithUsers = await Promise.all(
        docs.map(async (doc) => {
          const user = await getPostUser(doc);

          return {
            ...doc,
            user,
          };
        })
      );

      setPosts(docsWithUsers);
    } catch (err) {
      console.error(err);
    }
  };

  // get user's blogs
  const getPostUser = async (post) => {
    if (post) {
      const colRef = collection(db, "users");
      const q = query(colRef, where("id", "==", post.user));
      const snapShot = await getDocs(q);
      const docs = snapShot.docs.map((doc) => doc.data());
      const [user] = docs;
      return user;
    }
  };

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

  const value = {
    getPosts,
    addPost,
    getPostUser,
    posts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export { PostProvider, usePost };
