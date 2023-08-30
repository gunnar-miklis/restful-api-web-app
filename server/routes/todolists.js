const router = require( 'express' ).Router();
const Todolist = require( '../models/todolist' );
const Todo = require( '../models/todo' );


router.get( '/todolists', ( req, res ) => {
	Todolist.find()
		.populate( 'todos' )
		.then( ( foundTodolists ) => res.status( 200 ).json( foundTodolists ) )
		.catch( ( err ) => console.error( err ) );
} );

router.post( '/todolists', ( req, res ) => {
	const { name } = req.body;
	Todolist.create( { name } )
		.then( ( createdTodolist ) => res.status( 201 ).json( createdTodolist._id ) )
		.catch( ( err ) => console.error( err ) );
} );

router.get( '/todolists/:todolistID', ( req, res ) => {
	const { todolistID } = req.params;
	Todolist.findById( todolistID )
		.populate( 'todos' )
		.then( ( foundTodolist ) => res.status( 200 ).json( foundTodolist ) )
		.catch( ( err ) => console.error( err ) );
} );

router.put( '/todolists/:todolistID', ( req, res ) => {
	const { todolistID } = req.params;
	const { name } = req.body;
	Todolist.findByIdAndUpdate( todolistID, { name }, { new: true } )
		.then( ( updatedTodolist ) => res.status( 201 ).json( updatedTodolist ) )
		.catch( ( err ) => console.error( err ) );
} );

router.delete( '/todolists/:todolistID', ( req, res ) => {
	const { todolistID } = req.params;
	// COMMENT: i tried to avoid chaining a "callback hell", so i used async/await to make the code a bit easier to read.
	// COMMENT: i realized just now (a bit late), that there's the "todolistID" stored as reference in each todo. so, the code could be even a bit shorter at this point.
	( async () => {
		try {
			// 1. find the todolist
			const foundTodolist = await Todolist.findById( todolistID );

			// 2. loop through the todos array associated with this todolist
			await foundTodolist.todos.map( async ( todo ) => {
				try {
					// 3. find and delete each todo that is associated with this todolist
					await Todo.findByIdAndDelete( todo._id );
				} catch ( err ) {
					console.error( err );
				}
			} );

			// 4. finally, delete the todolist itself
			await Todolist.findByIdAndDelete( todolistID );

			// 5. respond with status only, since there's no need to send any data.
			res.sendStatus( 204 );
		} catch ( err ) {
			console.error( err );
		}
	} )();
} );


module.exports = router;
