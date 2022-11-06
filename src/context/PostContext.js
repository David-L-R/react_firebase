import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  serverTimestamp,
  where,
  query,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
const { createContext, useContext, useState } = require("react");

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
          id: doc.id,
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

  // get post by id
  const getPostById = async (id) => {
    const colRef = collection(db, "posts");
    const q = query(colRef, where("__name__", "==", id));
    const snapShot = await getDocs(q);
    const docs = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const [post] = docs;

    return post;
  };

  // edit a post

  const editPost = async (post) => {
    const docRef = doc(db, "posts", post.id);
    await setDoc(docRef, { ...post });
  };

  // remove a post
  const removePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
    getPosts();
  };

  const value = {
    getPosts,
    addPost,
    getPostUser,
    getPostById,
    editPost,
    removePost,
    posts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export { PostProvider, usePost };
