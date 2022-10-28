import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signup");
    }
  }, [user]);

  return <div className='App'>Welcome</div>;
};

export default App;
