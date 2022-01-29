import React from "react";
import "./css/Landing.css";
import { RouterProps, useHistory } from "react-router-dom";

const Landing = (props: RouterProps) => {
	const history = useHistory();
	return (
		<div className="landing">
			<div className="landing__banner">
				<div className="landing__container">
					<div className="landing__logo"></div>
					<p className="landing__title">relax.</p>
					<p className="landing__text">
						stressed? relax by viewing, downloading, and sharing the best part of life: cats.
					</p>
					<button className="landing__btn btn"
						onClick={ () => history.push("/app") }>enter</button>
				</div>
			</div>
		</div>
	);
}

export default Landing;