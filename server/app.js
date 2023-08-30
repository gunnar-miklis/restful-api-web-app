const express = require( 'express' );
const app = express();
require( 'dotenv' ).config();
require( './db' );
require( './config' )( app );


// routes
const indexRoutes = require( './routes/index' );
app.use( '/api', indexRoutes );

const todosRoutes = require( './routes/todos' );
app.use( '/api', todosRoutes );

const todolistsRoutes = require( './routes/todolists' );
app.use( '/api', todolistsRoutes );

require( './error-handling' )( app );


module.exports = app;
