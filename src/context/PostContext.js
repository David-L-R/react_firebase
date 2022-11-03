import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebase";
const { createContext, useContext } = require("react");

const PostContext = createContext();

const usePost = () => {
  return useContext(PostContext);
};

const PostProvider = ({ children }) => {
  // get all Posts
  // const [user, loading] = useAuth();

  const getAllPosts = () => {};

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
    getAllPosts,
    addPost,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export { PostProvider, usePost };
