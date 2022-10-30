import { useAuth } from "../../../context/AuthContext";
import { Logo } from "../logo/Logo";
import "./navbar.css";

export const Navbar = () => {
  const { user, signout } = useAuth();

  return (
    <nav>
      <Logo />
      <div className='persona'>
        {user && <p>{user.email}</p>}{" "}
        <button className='error' onClick={signout}>
          Logout
        </button>
      </div>
    </nav>
  );
};
