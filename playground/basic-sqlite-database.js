/**
 * Created by alicanbalik on 10/17/16.
 */

var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, { //4th parameter is object
    'dialect': 'sqlite',
    'storage': __dirname + '/basic-sqlite-database.sqlite'
});
// we create instance of Sequelie that we can do some stuff --^


//creates table if not exists
var Todo = sequelize.define('todo', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            //notEmpty: true //means description cannot be an empty string.
            len: [1, 250] //check the input if length is 1 or greater and 250 and less.
        }
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        //http://docs.sequelizejs.com/en/v3/docs/models-definition/
        defaultValue: false //if user doesn't enter completed variable, program makes it false(0) by default.
    }
});

//sequelize.sync({force: true})
// force: true is gonna automatically drop all tables, and re-create them.
// if force: false which is by default, its only gonna create the tables if they are not already existing.
sequelize.sync({force: false}).then(function () { //first run sync() func, if it doesn't throw an error, then() function works.
    console.log("Everything is synced");

    //Challenge:
//fetch todo item by its id. if you find it print it using json, if you dont, print err.

    Todo.findById(2).then(function(todo) {
        if(todo) {
            console.log(todo.toJSON());
        } else {
            console.log('no todo found!');
        }
    });

    //Challenge ends


//     //if we want to create new todo item:
//     Todo.create({
//         description: 'Find someone',
//         // completed: false
//     }).then(function (todo) {
//         return Todo.create({
//             description: 'Clean the house'
//         });
//     }).then(function () {
//         // return Todo.findById(1); //finds a specific column with defined id.
//         return Todo.findAll({
//             where: { //TSQL'deki 2. part
//                 //completed: false
//                 description: {
//                     $like: '%clean%'
//                 }
//             }
//         })
//     }).then(function (todos) {
//         if (todos) {
//             todos.forEach(function (todo) {
//                 console.log(todo.toJSON()); //toJSON() shows the attributes we care about.
//             });
//         } else {
//             console.log('No todo found!');
//         }
//     }).catch(function (err) {
//         console.log(err); //it only shows the error. So we can show it to user.
//     }); //we can add new functions after then to make the chain alive.
});
