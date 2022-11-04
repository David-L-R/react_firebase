import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { usePost } from "./context/PostContext";
import AuthPage from "./components/Layout/authPage/AuthPage";
import { Loader } from "./components/loader/Loader";
import { Post } from "./components/post/Post";

const Posts = () => {
  const { user } = useAuth();
  const { getPosts, posts } = usePost();

  useEffect(() => {
    getPosts();
  }, []);

  if (!user) return null;

  if (!posts || posts.length === 0)
    return (
      <AuthPage>
        <Loader />
      </AuthPage>
    );

  return (
    <AuthPage>
      {posts.map((post) => (
        <Post post={post} user={user} />
      ))}
    </AuthPage>
  );
};

export default Posts;
