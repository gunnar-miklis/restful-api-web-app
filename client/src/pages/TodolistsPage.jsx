import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './todolistsStyles.css';


export default function Todolists() {
	const [ todolists, setTodolists ] = useState( [] );
	const navigate = useNavigate();

	useEffect( () => {
		getTodolists();
	}, [] );

	async function getTodolists() {
		try {
			const response = await apiService.getAllTodoslists();
			setTodolists( response.data );
		} catch ( err ) {
			setTodolists( [] );
			console.error( err );
		}
	}

	function handleAddNew( event ) {
		event.preventDefault();
		const name = event.target[0].value;

		// if there's no input exit function
		if ( !name ) return;

		( async () => {
			try {
				const createdTodolistID = await apiService.postTodolist( { name } );

				// navigate to the new created todolist
				navigate( `/todolists/${createdTodolistID.data}` );
			} catch ( err ) {
				setTodolists( [] );
				console.error( err );
			}
		} )();
	}

	return (
		<>
			<h1>Todolists</h1>


			{/* if there's no todolist, leave empty. else loop and display all lists */}
			{
				todolists.length ? (
					<div className='todo-container'>
						{
							todolists.map( ( todolist ) => (
								<Link key={todolist._id} to={`/todolists/${todolist._id}`}>
									<div className='todo-item'>
										<h3 style={{ wordBreak: 'break-word' }}>{todolist.name}</h3>
										<p>{todolist.todos.length} Todos</p>
									</div>
								</Link>
							) )
						}
					</div>
				) : <span></span>
			}
			<form onSubmit={handleAddNew}>
				<div className='interaction-container'>
					<input
						type='text'
						name='name'
						placeholder='new todolist'
					/>
					<button className='input-button' type='submit'>➕</button>
				</div>
			</form>


			<br/>
			<NavLink to='/home'>Home</NavLink>
		</>
	);
}
