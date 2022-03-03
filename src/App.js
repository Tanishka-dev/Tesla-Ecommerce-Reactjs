import React, { useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
	const homeRef = useRef();

	return (
		<div className="App">
			<Header homeRef={homeRef} />
			<Home homeRef={homeRef} />
		</div>
	);
}

export default App;
