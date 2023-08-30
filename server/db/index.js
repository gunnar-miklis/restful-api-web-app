const mongoose = require( 'mongoose' );

const MONGO_URI = process.env.ATLAS_URI || 'mongodb://localhost:27017/alpha';

mongoose.connect( MONGO_URI )
	.then( ( x ) => {
		const dbName = x.connections[0].name;
		console.log( `Connected to Mongo! Database name: "${dbName}"` );
	} )
	.catch( ( err ) => {
		console.error( 'Error connecting to mongo: ', err );
	} );
