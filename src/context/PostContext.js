import { db } from "../utils/firebase";
const { createContext, useContext, useState, useEffect } = require("react");

const PostContext = createContext();

const usePost = () => {
  return useContext(PostContext);
};

const PostProvider = ({ children }) => {
  // get all Posts

  const getAllPosts = () => {
    db.collection("blogs")
      // .where("capital", "==", true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  // get user's blogs

  // add a blog

  // edit a blog

  // remove a blog

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  const value = {
    getAllPosts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export { PostProvider, usePost };
