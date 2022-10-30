import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Layout/footer/Footer";
import { Navbar } from "./components/Layout/navbar/Navbar";
import { useAuth } from "./context/AuthContext";
import { useBlog } from "./context/BlogContext";

const App = () => {
  const { user } = useAuth();
  const { getAllBlogs } = useBlog();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signup");
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className='App'>
      <Navbar />
      <div>
        <button onClick={getAllBlogs}>Fetch Database</button>
      </div>
      <Footer />
    </div>
  );
};

export default App;
