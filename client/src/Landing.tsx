import React from "react";
import "./Landing.css";
import { RouterProps, useHistory } from "react-router-dom";

const Landing = (props: RouterProps) => {
	const history = useHistory();
	return (
		<div className="landing">
			<div className="landing__banner">
				<div className="landing__logo"></div>
				<p className="landing__text">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, quis!
				</p>
				<button className="landing__btn btn"
					onClick={ () => history.push("/app") }>Enter</button>
			</div>
		</div>
	);
}

export default Landing;