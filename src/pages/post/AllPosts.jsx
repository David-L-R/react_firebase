import "./post.css";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { usePost } from "../../context/PostContext";
import { Button } from "../../components/button/Button";
import AuthPage from "../../components/Layout/authPage/AuthPage";

const Posts = () => {
  const [post, setPost] = useState({
    description: "",
  });
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
      await addPost(post, user.uid);
    } catch (err) {
      console.log("error", err);
    }
  };

  if (!user) return null;

  return (
    <AuthPage>
      <div className='form-container'>
        <form onSubmit={submitPost}>
          <h1>What you gotta say?</h1>
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
      </div>
    </AuthPage>
  );
};

export default Posts;
