import "./authPage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";
import { useAuth } from "../../../context/AuthContext";

const AuthPage = ({ children, className }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user & !loading) {
      navigate("/signup");
    }
  }, [user, loading, navigate]);

  if (!user) return null;

  return (
    <div className='page'>
      <Navbar />
      <div className={`main ${className}`}>{children}</div>
      <Footer />
    </div>
  );
};

export default AuthPage;
