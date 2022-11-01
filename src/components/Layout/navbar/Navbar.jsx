import Avatar from "boring-avatars";
import { colorPallete } from "../../../constants/colorPallete";
import { useAuth } from "../../../context/AuthContext";
import { Logo } from "../logo/Logo";
import "./navbar.css";

export const Navbar = () => {
  const { user, signout } = useAuth();

  return (
    <nav>
      <div className='persona'>
        <Avatar
          size={40}
          name={user.email}
          variant='beam'
          colors={colorPallete}
        />
        {user && <p>{user.email}</p>}
      </div>
      <button className='error' onClick={signout}>
        Logout
      </button>
    </nav>
  );
};
