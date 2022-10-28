import "./input.css";

export const Input = ({ children, id, error, ...rest }) => {
  return (
    <div className='input-container'>
      <label htmlFor={id}>{children}</label>
      <input id={id} {...rest} />
      {error && <p className='error-text'>{error}</p>}
    </div>
  );
};
