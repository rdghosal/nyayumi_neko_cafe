import { RouterProps, useHistory } from 'react-router';

const Navigation = (props: RouterProps) => {
	
	const history = useHistory();

	return (
		<div className="nav">
			<div className="nav__logo"
				onClick={ () => history.push("/") }>
			</div>
		</div>
	)
}

export default Navigation;
