import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/api';
import Loader from '../components/loader/Loader';


export default function TodoPage() {
	const [ todo, setTodo ] = useState( {} );
	const { todoID } = useParams();
	const navigate = useNavigate();

	useEffect( () => {
		getTodo();
	}, [] );

	async function getTodo() {
		try {
			const response = await apiService.getTodo( todoID );
			setTodo( response.data );
		} catch ( err ) {
			setTodo( {} );
			console.error( err );
		}
	}

	async function updateTodo( data ) {
		try {
			const response = await apiService.updateTodo( todoID, data );
			setTodo( response.data );
		} catch ( err ) {
			setTodo( {} );
			console.error( err );
		}
	}

	function handleUpdate( event ) {
		event.preventDefault();
		const data = { name: todo.name, isDone: todo.isDone };
		updateTodo( data );
	}

	function toggleIsDone() {
		// switch to the opposite if true
		const isDone = todo.isDone ? false : true;

		const data = { name: todo.name, isDone };
		updateTodo( data );
	}

	function handleDelete() {
		( async () => {
			try {
				await apiService.deleteTodo( todoID );
				navigate( -1 );
			} catch ( err ) {
				setTodo( {} );
				console.error( err );
			}
		} )();
	}

	if ( !Object.keys( todo ).length ) return <Loader title='Todo'/>;

	return (
		<>
			<h1>{todo.name}</h1>


			{/* NOTE: name */}
			<h3 className='section-header'>Rename</h3>
			<form id='update-form' onSubmit={handleUpdate}>
				<div className='interaction-container'>
					<input
						type='text'
						name='todo-name'
						value={todo.name}
						onChange={ ( event ) => setTodo( { ...todo, name: event.target.value } ) }
					/>
					<button htmlFor='update-form' className='input-button' type='submit'>✔️</button>
				</div>
			</form>


			{/* NOTE: status */}
			<h3 className='section-header'>Status</h3>
			<div className='interaction-container'>
				<button onClick={()=>toggleIsDone()}>
					{ todo.isDone ? '✅ Done' : '🔄️ Pending' }
				</button>
			</div>


			{/* NOTE: delete */}
			<h3 className='section-header'>Delete Todo</h3>
			<div className='interaction-container'>
				<button onClick={()=>handleDelete()}>❌</button>
			</div>


			<br/>
			<br/>
			{/* to go back one page in history (the associated todolist), i use "navigate( -1 )" on click */}
			<NavLink onClick={ () => navigate( -1 ) }>Back</NavLink>
		</>
	);
}
