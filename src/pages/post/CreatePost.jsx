import "./post.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Layout/footer/Footer";
import { Navbar } from "../../components/Layout/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import { usePost } from "../../context/PostContext";

const CreatePost = () => {
  const { user, loading } = useAuth();
  //   const { getAllBlogs } = useBlog();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user & !loading) {
      navigate("/signup");
    }
  }, [user, loading, navigate]);

  if (!user) return null;

  return (
    <div className='App'>
      <Navbar />
      <div className='main'>
        <div className='form-container'>
          <form></form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
