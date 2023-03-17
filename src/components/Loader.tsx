import React from "react";
import "../styles/loader.scss";

const Loader: React.FC = (props) => {
  return (
    <div className="loader">
      <div className="loader__line"></div>
      <div className="loader__line"></div>
      <div className="loader__line"></div>
    </div>
  );
};

export default Loader;
