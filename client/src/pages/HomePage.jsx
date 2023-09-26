import { NavLink } from 'react-router-dom';

export default function HomePage() {
	return (
		<>
			<h1>Home</h1>

			<p style={{ marginBottom: 0 }}>RESTful API Web App</p>
			<p style={{ marginTop: 0, fontSize: 'small' }}>by <a href='https://flowcv.me/gunnar-miklis' target='_blank' rel="noreferrer">Gunnar Miklis</a></p>

			<br/>
			<NavLink to='/todolists'>Show Todolists</NavLink>
		</>
	);
}
