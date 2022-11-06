import "./post.css";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { usePost } from "../../context/PostContext";
import { Button } from "../../components/button/Button";
import AuthPage from "../../components/Layout/authPage/AuthPage";
import { Alert } from "../../components/alert/Alert";
import { Loader } from "../../components/loader/Loader";

const initialPost = {
  description: "",
};

const CreatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [loading, setLoading] = useState(false);
  const [success, setSuccss] = useState(false);
  const [error, setError] = useState(false);

  const { user } = useAuth();
  const { addPost } = usePost();

  const MAX_CHARACTERS = 300;

  //   const descriptionLength = description.split(" ").length;
  const descriptionLength = post.description.length;
  const lengthError = post.description.length > MAX_CHARACTERS;
  const submitPost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setSuccss(false);
      setError(false);
      await addPost(post, user.uid);
      setSuccss(true);
      setLoading(false);
      setPost(initialPost);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <AuthPage className='center'>
      <div className='form-container'>
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={submitPost}>
            <h1>What you gotta say?</h1>
            {success && (
              <Alert className='success' style={{ marginBottom: "12px" }}>
                Post Published
              </Alert>
            )}
            {error && (
              <Alert className='error' style={{ marginBottom: "12px" }}>
                {error}
              </Alert>
            )}
            <textarea
              type='text'
              id='description'
              className='text-area-description'
              onChange={(e) =>
                setPost({
                  ...post,
                  description: e.target.value,
                })
              }
              required
              placeholder='Description'
              value={post.description}
            />
            <p className={lengthError ? "text-red" : ""}>
              {descriptionLength}/{MAX_CHARACTERS}
            </p>
            <Button className='success' type='submit' disabled={lengthError}>
              Share
            </Button>
          </form>
        )}
      </div>
    </AuthPage>
  );
};

export default CreatePost;
