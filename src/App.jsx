import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Layout/footer/Footer";
import { Navbar } from "./components/Layout/navbar/Navbar";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();
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
      <div></div>
      <Footer />
    </div>
  );
};

export default App;
