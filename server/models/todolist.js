const { Schema, model } = require( 'mongoose' );


const todolistSchema = new Schema(
	{
		name: {
			type: String,
		},
		todos: [
			{
				type: Schema.Types.ObjectId, ref: 'Todo',
			},
		],
	},
	{
		timestamps: true,
	},
);


const Todolist = model( 'Todolist', todolistSchema );
module.exports = Todolist;
