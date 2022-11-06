import { Link } from "react-router-dom";
import "./button.css";

export const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export const LinkButton = ({ children, to, className, ...props }) => {
  return (
    <Link className={`link-button ${className}`} to={to} {...props}>
      {children}
    </Link>
  );
};
