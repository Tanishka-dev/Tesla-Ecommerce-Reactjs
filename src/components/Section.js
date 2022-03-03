import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { useDispatch } from "react-redux";
import { setCarRef } from "../features/Car/carSlice";

function Section(props) {
	let myRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (myRef.current) {
			dispatch(setCarRef({ id: props.id, ref: myRef }));
		}
	}, [myRef.current]);

	return (
		<Wrap ref={myRef} id={props.title} bgImage={props.backgroundImg}>
			<Fade bottom>
				<ItemSet>
					<h1>{props.title}</h1>
					<p>{props.description}</p>
				</ItemSet>
			</Fade>
			<Buttons>
				<Fade bottom>
					<ButtonGroup>
						<LeftButton>{props.leftBtnText}</LeftButton>
						{props.rightBtnText && <RightButton>{props.rightBtnText}</RightButton>}
					</ButtonGroup>
				</Fade>
				<DownArrow src="images/down-arrow.svg"></DownArrow>
			</Buttons>
		</Wrap>
	);
}

export default Section;

const Wrap = styled.div`
	scroll-snap-align: start;
	height: 100vh;
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	background-image: ${(props) => `url("images/${props.bgImage}")`};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

const ItemSet = styled.div`
	padding-top: 15vh;
	test-align: center;
`;

const ButtonGroup = styled.div`
	display: flex;
	margin-bottom: 30px;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const LeftButton = styled.div`
	background-color: rgba(23, 26, 32, 0.8);
	height: 40px;
	width: 256px;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 100px;
	opacity: 0.85;
	text-transform: uppercase;
	font-size: 12px;
	cursor: pointer;
	margin: 8px;
`;

const RightButton = styled(LeftButton)`
	background: white;
	opacity: 0.65;
	color: black;
`;

const DownArrow = styled.img`
	margin-top: 20px;
	height: 40px;
	animation: animateDown infinite 1.5s;
	overflow-x: hidden;
`;

const Buttons = styled.div``;
