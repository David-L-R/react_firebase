import "./post.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { usePost } from "../../context/PostContext";
import { Button } from "../../components/button/Button";
import AuthPage from "../../components/Layout/authPage/AuthPage";
import { Alert } from "../../components/alert/Alert";
import { Loader } from "../../components/loader/Loader";
import { useParams } from "react-router-dom";

const UpdatePost = () => {
  const { id } = useParams();
  const { getPostById, editPost } = usePost();
  const { user } = useAuth();

  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccss] = useState(false);
  const [error, setError] = useState(false);
  const [initialDescription, setInitialDescription] = useState("");

  console.log(post);

  useEffect(() => {
    const getPost = async (id) => {
      setLoading(true);
      const post = await getPostById(id);
      setPost(post);
      setInitialDescription(post.description);
      setLoading(false);
    };
    getPost(id);
  }, [id, getPostById]);

  const submitPost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setSuccss(false);
      setError(false);
      await editPost(post);
      setSuccss(true);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (!user) return null;

  if (loading || !post)
    return (
      <AuthPage className='center'>
        <Loader />
      </AuthPage>
    );

  const MAX_CHARACTERS = 300;
  const descriptionLength = post.description.length;
  const lengthError = post.description.length > MAX_CHARACTERS;

  return (
    <AuthPage className='center'>
      <div className='form-container'>
        <form onSubmit={submitPost}>
          <h1>Edit</h1>
          {success && (
            <Alert className='success' style={{ marginBottom: "12px" }}>
              Post Updated
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
          <Button
            className='success'
            type='submit'
            disabled={lengthError || post.description === initialDescription}
          >
            UPDATE
          </Button>
        </form>
      </div>
    </AuthPage>
  );
};

export default UpdatePost;
