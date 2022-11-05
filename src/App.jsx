import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { usePost } from "./context/PostContext";
import AuthPage from "./components/Layout/authPage/AuthPage";
import { Loader } from "./components/loader/Loader";
import { Post } from "./components/post/Post";
import { useNavigation } from "react-router-dom";

const Posts = () => {
  const { user, loading } = useAuth();
  const { getPosts, posts } = usePost();
  const navigate = useNavigation();

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/signup");
    }
  }, [user, loading, navigate]);

  if (!user && loading) return <Loader />;

  if (!posts || posts.length === 0)
    return (
      <AuthPage>
        <Loader />
      </AuthPage>
    );

  return (
    <AuthPage>
      {posts.map((post) => (
        <Post post={post} user={user} key={post.uid} />
      ))}
    </AuthPage>
  );
};

export default Posts;
