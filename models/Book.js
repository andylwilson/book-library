const mongoose = require('mongoose');

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
const credentials = require('../config/db_config');

// local db connection settings 
// const ip = process.env.ip || '127.0.0.1';
// const connectionString = 'mongodb://' +ip+ '/<DB_NAME>';

mongoose.connect(credentials.connection(), { dbName: 'projects', useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define Book model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
 title: { type: String, required: true },
 author: String,
 isbn: Number,
}); 

module.exports = mongoose.model('books', mySchema);