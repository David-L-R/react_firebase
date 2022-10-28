import "./logo.css";

export const Logo = ({ className, ...props }) => {
  return (
    <div className={`logo ${className}`} {...props}>
      📝 LogYourBlog
    </div>
  );
};
