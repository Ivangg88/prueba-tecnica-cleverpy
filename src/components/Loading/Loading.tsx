import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__balls-container">
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
        <div className="ball ball4"></div>
        <div className="ball ball5"></div>
      </div>
      <h1 className="loading__title">Loading...</h1>
    </div>
  );
};

export default Loading;
