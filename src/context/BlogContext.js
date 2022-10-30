import { db } from "../utils/firebase";
const { createContext, useContext, useState, useEffect } = require("react");

const BlogContext = createContext();

const useBlog = () => {
  return useContext(BlogContext);
};

const BlogProvider = ({ children }) => {
  // get all blogs

  const getAllBlogs = () => {
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
    getAllBlogs,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export { BlogProvider, useBlog };
