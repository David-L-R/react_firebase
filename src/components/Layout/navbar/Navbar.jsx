import { useAuth } from "../../../context/AuthContext";
import { Logo } from "../logo/Logo";
import "./navbar.css";

export const Navbar = () => {
  const { user, signout } = useAuth();

  return (
    <nav>
      <Logo />
      <div>{user && <p>{user.email}</p>}</div>
      <button onClick={signout}>Logout</button>
    </nav>
  );
};
