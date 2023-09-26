import { NavLink, useNavigate } from 'react-router-dom';
import './loader.css';

export default function Loader( { title } ) {
	const navigate = useNavigate();

	return (
		<>
			<h2>Loading {title}</h2>
			<div className="custom-loader"></div>
			<NavLink onClick={ () => navigate( -1 ) }>Back</NavLink>
		</>
	);
}
