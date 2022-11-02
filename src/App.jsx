import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Layout/footer/Footer";
import { Navbar } from "./components/Layout/navbar/Navbar";
import { useAuth } from "./context/AuthContext";
import { usePost } from "./context/PostContext";

const App = () => {
  const { user, loading } = useAuth();
  const { getAllPosts } = usePost();
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
      <div>
        <h1>Home</h1>
        {/* <button onClick={getAllBlogs}>Fetch Database</button> */}
      </div>
      <Footer />
    </div>
  );
};

export default App;
