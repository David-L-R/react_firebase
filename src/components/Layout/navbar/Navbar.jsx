import Avatar from "boring-avatars";
import { Link } from "react-router-dom";
import { colorPallete } from "../../../constants/colorPallete";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "../../button/Button";
import "./navbar.css";

export const Navbar = () => {
  const { user, signout, userInfo } = useAuth();

  return (
    <nav>
      <div className='persona'>
        <Avatar
          size={40}
          name={user.email}
          variant='beam'
          colors={colorPallete}
        />
        {userInfo && <p>{userInfo.name}</p>}
      </div>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/create'>Create</Link>
        <Button className='error' onClick={signout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};
