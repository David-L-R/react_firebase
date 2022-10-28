import "./alert.css";

export const Alert = ({ children, className, ...props }) => {
  return (
    <div className={`alert ${className}`} {...props}>
      {children}
    </div>
  );
};
