import React from "react";
import "../styles/FloatingBackground.css";

const FloatingBackground: React.FC = () => {
  return (
    <div className="floating-background">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="floating-square" />
      ))}
    </div>
  );
};

export default FloatingBackground;
