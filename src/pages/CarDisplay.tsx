import React, { MutableRefObject, useRef } from "react";
import Header from "../components/Header";
import CarDetail from "../components/CarDetail";

const CarDisplay = () => {
  const homeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <Header />
      <CarDetail />
    </div>
  );
};

export default CarDisplay;
