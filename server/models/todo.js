const { Schema, model } = require( 'mongoose' );


const todoSchema = new Schema(
	{
		name: {
			type: String,
		},
		isDone: {
			type: Boolean,
			default: false,
		},
		todolistID: {
			type: Schema.Types.ObjectId, ref: 'Todolist',
		},
	},
	{
		timestamps: true,
	},
);


const Todo = model( 'Todo', todoSchema );
module.exports = Todo;
