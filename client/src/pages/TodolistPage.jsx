import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/api';
import Loader from '../components/loader/Loader';


export default function TodolistPage() {
	const [ todolist, setTodolist ] = useState( {} );
	const { todolistID } = useParams();
	const navigate = useNavigate();
	const [ isDeletionError, setIsDeletionError ] = useState( false );
	const [ newTodoInput, setNewTodoInput ] = useState( '' );

	useEffect( () => {
		getTodolist();
	}, [] );

	async function getTodolist() {
		try {
			const response = await apiService.getTodolist( todolistID );
			setTodolist( response.data );
		} catch ( err ) {
			setTodolist( {} );
			console.error( err );
		}
	}

	function handleUpdate( e ) {
		e.preventDefault();
		( async () => {
			try {
				await apiService.updateTodolist( todolistID, { name: todolist.name, todos: todolist.todos } );
				getTodolist();
			} catch ( err ) {
				setTodolist( {} );
				console.error( err );
			}
		} )();
	}

	function handleDelete( e ) {
		e.preventDefault();
		const confirmation = e.target[0].value;

		// if the todolist name does match the confirmation from the input, call API to delete the list. else show error message.
		if ( todolist.name === confirmation ) {
			setIsDeletionError( false );
			( async () => {
				try {
					await apiService.deleteTodolist( todolistID );
					navigate( '/todolists' );
				} catch ( err ) {
					setTodolist( {} );
					console.error( err );
				}
			} )();
		} else {
			setIsDeletionError( true );
		}
	}

	function handleNewTodo( e ) {
		e.preventDefault();
		const name = e.target[0].value;

		// if there's no input exit function
		if ( !name ) return;

		( async () => {
			try {
				await apiService.postTodo( { todolistID, name } );

				// reset the input field
				setNewTodoInput( '' );

				getTodolist();
			} catch ( err ) {
				console.error( err );
			}
		} )();
	}

	if ( !Object.keys( todolist ).length ) return <Loader title='Todolist'/>;

	return (
		<>
			<h1>{todolist.name}</h1>


			{/* NOTE: name */}
			<h3 className='section-header'>Rename</h3>
			<form id='updateForm' onSubmit={handleUpdate}>
				<div className='interaction-container'>
					<input
						type='text'
						name='todolistName'
						value={todolist.name}
						onChange={ ( e ) => setTodolist( { ...todolist, name: e.target.value } ) }
					/>
					<button htmlFor='updateForm' className='input-button' type='submit'>✔️</button>
				</div>
			</form>


			{/* NOTE: todos */}
			<h3 className='section-header'>Todos</h3>
			{/* if there's no todos in the todolist, leave empty. else loop and display all todos */}
			{
				todolist.todos.length ? (
					<div className='list-container'>
						{
							todolist.todos.map( ( todo ) => (
								<Link key={todo._id} to={`/todos/${todo._id}`} className='list-item'>
									{ todo.isDone ? <span>✅ </span> : <span>🔄️ </span> }
									<span style={{ wordBreak: 'break-word' }}>{todo.name}</span>
								</Link>
							) )
						}
					</div>
				) : <span></span>
			}
			<form id='newTodoForm' onSubmit={handleNewTodo}>
				<div className='interaction-container'>
					<input
						id='newTodoInput'
						type='text'
						name='todoName'
						value={newTodoInput}
						onChange={( e )=>setNewTodoInput( e.target.value )}
						placeholder='new todo'
					/>
					<button htmlFor='newTodoForm' className='input-button' type='submit'>➕</button>
				</div>
			</form>


			{/* NOTE: delete */}
			<h3 className='section-header'>Delete Todolist</h3>
			<form id='deleteFrorm' onSubmit={handleDelete}>
				<div className='interaction-container'>
					<input
						type='text'
						name='deleteTodolist'
						placeholder='type todolist name to confirm'
					/>
					<button htmlFor='deleteFrorm' className='input-button' type='submit'>❌</button>
				</div>
			</form>
			{/* show error message if needed */}
			<p style={{
				fontWeight: '600',
				fontSize: '0.8rem',
				color: '#f92f60',
				marginTop: '-0.6em' }}
			>
				{ isDeletionError && '*Your input does not match the todolists name' }
			</p>


			<br/>
			<NavLink to='/todolists'>Show Todolists</NavLink>
		</>
	);
}

