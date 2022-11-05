import "./post.css";
import { Button } from "../button/Button";
import Avatar from "boring-avatars";
import { getDate } from "../../utils/getdate";
import { colorPallete } from "../../constants/colorPallete";

export const Post = ({ post, user }) => {
  const { day, month, year } = getDate(post.date);

  return (
    <div className='post-card'>
      <header>
        <div className='avatar'>
          <Avatar
            size='20px'
            name={post?.user?.name ? post.user.name : "User deleted"}
            colors={colorPallete}
            variant='beam'
          />
          <p className={!post.user && "deleted"}>
            {post.user?.name ? post.user.name : "User deleted"}
          </p>
        </div>
        <p className='date'>{`${day}/${month}/${year}`}</p>
      </header>
      <p className='description'>{post.description}</p>
      {user.uid === post.user?.id && (
        <div className='button-container'>
          <Button>Edit</Button>
          <Button className='error'>Delete</Button>
        </div>
      )}
    </div>
  );
};
