import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/api';


const initalState = { _id: '', name: '', isDone: false };

export default function TodoPage() {
	const [ todo, setTodo ] = useState( initalState );
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
			setTodo( initalState );
			console.error( err );
		}
	}

	async function updateTodo( data ) {
		try {
			const response = await apiService.updateTodo( todoID, data );
			setTodo( response.data );
		} catch ( err ) {
			setTodo( initalState );
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
				setTodo( initalState );
				console.error( err );
			}
		} )();
	}

	return (
		<>
			<h1>{todo.name}</h1>


			{/* NOTE: name */}
			<h3 style={{ margin: '25px 0px 5px' }}>Name</h3>
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
			<h3 style={{ margin: '25px 0px 5px' }}>Status</h3>
			<div className='interaction-container'>
				<button onClick={()=>toggleIsDone()}>
					{ todo.isDone ? '✅ Done' : '🔄️ Pending' }
				</button>
			</div>


			{/* NOTE: delete */}
			<h3 style={{ margin: '25px 0px 5px' }}>Delete Todo</h3>
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