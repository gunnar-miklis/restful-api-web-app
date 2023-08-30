const router = require( 'express' ).Router();
const Todolist = require( '../models/todolist' );
const Todo = require( '../models/todo' );


router.post( '/todos', ( req, res ) => {
	const { todolistID, name } = req.body;
	( async () => {
		try {
			// 1. create a new todo
			const createdTodo = await Todo.create( { name, todolistID } );

			// 2. find the associated todolist and push the new todo to the todolists "todos" array.
			await Todolist.findByIdAndUpdate( todolistID, { $push: { todos: createdTodo._id } } );

			// 3. respond with status only, since there's no need to send any data.
			res.sendStatus( 201 );
		} catch ( err ) {
			console.error( err );
		}
	} )();
} );

router.get( '/todos/:todoID', ( req, res ) => {
	const { todoID } = req.params;
	Todo.findById( todoID )
		.then( ( foundTodo ) => res.status( 200 ).json( foundTodo ) )
		.catch( ( err ) => console.error( err ) );
} );

router.put( '/todos/:todoID', ( req, res ) => {
	const { todoID } = req.params;
	const { name, isDone } = req.body;
	Todo.findByIdAndUpdate( todoID, { name, isDone }, { new: true } )
		.then( ( updatedTodo ) => res.status( 201 ).json( updatedTodo ) )
		.catch( ( err ) => console.error( err ) );
} );

router.delete( '/todos/:todoID', ( req, res ) => {
	const { todoID } = req.params;
	Todo.findByIdAndDelete( todoID )
		.then( () => res.sendStatus( 204 ) )
		.catch( ( err ) => console.error( err ) );
} );


module.exports = router;
