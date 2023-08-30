import axios from 'axios';

class ApiServices {
	constructor() {
		this.api = axios.create( {
			baseURL: import.meta.env.VITE_APP_BACKEND_URI || 'http://localhost:5005',
		} );
	}

	// NOTE: Todolists
	getAllTodoslists() {
		return this.api.get( '/api/todolists' );
	}
	postTodolist( todolistData ) {
		return this.api.post( '/api/todolists', todolistData );
	}
	getTodolist( todolistID ) {
		return this.api.get( `/api/todolists/${todolistID}` );
	}
	updateTodolist( todolistID, todolistData ) {
		return this.api.put( `/api/todolists/${todolistID}`, todolistData );
	}
	deleteTodolist( todolistID ) {
		return this.api.delete( `/api/todolists/${todolistID}` );
	}

	// NOTE: Todos
	postTodo( todoData ) {
		return this.api.post( '/api/todos', todoData );
	}
	getTodo( todoID ) {
		return this.api.get( `/api/todos/${todoID}` );
	}
	updateTodo( todoID, todoData ) {
		return this.api.put( `/api/todos/${todoID}`, todoData );
	}
	deleteTodo( todoID ) {
		return this.api.delete( `/api/todos/${todoID}` );
	}
}

const apiService = new ApiServices();
export default apiService;
