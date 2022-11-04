import "./post.css";
import { Button } from "../button/Button";

export const Post = ({ post, user }) => {
  const day =
    post.date.getDate() < 10 ? "0" + post.date.getDate() : post.date.getDate();
  const month =
    post.date.getMonth() + 1 < 10
      ? "0" + (post.date.getMonth() + 1)
      : post.date.getMonth() + 1;

  console.log(user);
  console.log(post);

  return (
    <div className='post-card'>
      <p>{post.description}</p>
      <h3>user: {post.user}</h3>
      <p>{`${day}/${month}/${post.date.getFullYear()}`}</p>
      {user.uid === post.user && (
        <div className='button-container'>
          <Button>Edit</Button>
          <Button className='error'>Delete</Button>
        </div>
      )}
    </div>
  );
};
