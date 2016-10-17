/**
 * Created by alicanbalik on 10/17/16.
 */

// why we created data folder and .keep file:
// .keep is to prevent a couple of inconsistencies with operating system and empty directories

// why we created db.js:
// is to load all the modules to sequelize and return the db connection from server.js which is gonna call that file.
// server.js is gonna request db.js, db.js is gonna return it and server.js is gonna use it right inside the api requests.
// thats why db.js and server.js are in the same root.

var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') {// this is gonna be only true when heroku gets ran.
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        'dialect': 'postgres',
    });
} else {
    sequelize = new Sequelize(undefined, undefined, undefined, { //4th parameter is object
        'dialect': 'sqlite',
        'storage': __dirname + '/data/dev-todo-api.sqlite'
    });
} // if env is production, that means the project is working on heroku. Heroku calls postgre database, if the program is working on local, it'll call sqlite as db

var db = {}; // for exporting multiple files

//set db to todo property.
db.todo = sequelize.import(__dirname + '/models/todo.js'); // a function that lets you to load in sequelize modules from seperate files. You can keep your app syncorenized
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;// we can set it to a one thing. But if set it to an object variable , module exports can return multiple returns from the file.


