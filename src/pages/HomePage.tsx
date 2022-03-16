import React, { MutableRefObject, useRef } from "react";
import Header from "../components/Header";
import Home from "../components/Home";

const HomePage = () => {
	const homeRef = useRef<HTMLDivElement>(null);

	return (
		<div className="App">
			<Header homeRef={homeRef} />
			<Home homeRef={homeRef} />
		</div>
	);
};

export default HomePage;
