import "./loader.css";
export const Loader = () => {
  return (
    <div className='loader-container'>
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
