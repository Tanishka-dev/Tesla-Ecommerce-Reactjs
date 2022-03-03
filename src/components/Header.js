import React from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { selectCars } from "../features/Car/carSlice";
import { useSelector } from "react-redux";

function Header(props) {
	const [burgerStatus, setBurgerStatus] = React.useState(false);
	const cars = useSelector(selectCars);

	return (
		<Container>
			<a>
				<img src="images/logo.svg"></img>
			</a>
			<Menu>
				{cars &&
					cars.map((car, index) => (
						<h1
							onClick={() => {
								return props.homeRef.current.scrollTo({
									behavior: "smooth",
									top: car.ref.current.offsetTop,
								});
							}}
							key={car.id}
						>
							{car.title}
						</h1>
					))}
			</Menu>
			<RightMenu>
				<a href="#">Shop</a>
				<a href="#">Account</a>
				<CustomMenu onClick={() => setBurgerStatus(true)} />
			</RightMenu>
			<BurgerNav show={burgerStatus}>
				<CloseWrapper>
					<CustomClose onClick={() => setBurgerStatus(false)} />
				</CloseWrapper>
				<ul>
					{cars &&
						cars.map((car, index) => (
							<li
								onClick={() => {
									return props.homeRef.current.scrollTo({
										behavior: "smooth",
										top: car.ref.current.offsetTop,
									});
								}}
								key={car.id}
							>
								<h1> {car.title}</h1>
							</li>
						))}
				</ul>
			</BurgerNav>
		</Container>
	);
}

export default Header;

const Container = styled.div`
	min-height: 60px;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1;
`;
const Menu = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	h1 {
		font-size: 16px;
		font-weight: 700;
		cursor: pointer;
		text-transform: uppercase;
		padding: 0 10px;
		flex-wrap: nowrap;
	}
`;

const RightMenu = styled.div`
	display: flex;
	align-items: center;
	a {
		font-weight: 600;
		text-transform: uppercase;
		margin-right: 10px;
	}
	@media (max-width: 768px) {
		display: none;
	}
`;

const CustomMenu = styled(MenuIcon)`
	cursor: pointer;
`;

const BurgerNav = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	background: white;
	width: 300px;
	z-index: 16;
	list-style: none;
	padding: 20px;
	display: flex;
	flex-direction: column;
	text-align: start;
	transform: ${(props) => (props.show ? "translateX(0)" : "translateX(100%)")};
	transition: transform 0.2s ease-in;
	ul {
		list-style: none;
		li {
			padding: 15px 0;
			border-bottom: 1px solid rgba(0, 0, 0, 0.2);
			cursor: pointer;
			h1 {
				font-size: 16px;
				font-weight: 600;
			}
		}
	}
`;

const CustomClose = styled(CloseIcon)`
	cursor: pointer;
	transform: ${(props) => (props.show ? "translateX(0)" : "translateX(100%)")};
	margin-right: 30px;
`;

const CloseWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
`;
