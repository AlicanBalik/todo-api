/**
 * Created by alicanbalik on 10/9/16.
 */
//  Example displaying Dynamic array with POST
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore'); // we are gonna use underscore for refactoring our get and post /todos
var db = require('./db.js'); // we are gonna access our database.

var app = express(); // we call express variable as a function.
var PORT = process.env.PORT || 1992;
// var todos = [{
//     id: 1,
//     description: 'Find a girl!',
//     completed: false
// },
//     {
//         id: 2,
//         description: 'be a successfull programmer!',
//         completed: false
//     },
//     {
//         id: 3,
//         description: 'don\'t die today!',
//         completed: true
//     }];
var todos = [];
var todoNextId = 1; //for increasing id numbers.


// anytime a json request comes in, express is gonna parse it and we are gonna be able to access it via request.body
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Homepage!');
});

// GET /todos   GET /todos?completed=true&q=work
app.get('/todos', function (req, res) {
    // var queryParams = req.query; //enables querying
    // var filteredTodos = todos;
    //
    // // if has property && completed === 'true'
    // // filteredTodos = _.where(filteredTodos, ?); ?'s some object that you are gonna filter to use.
    // //else if has property && completed === 'false'
    // if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
    //     filteredTodos = _.where(filteredTodos, {completed: true});
    // } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
    //     filteredTodos = _.where(filteredTodos, {completed: false});
    // }
    // // q=work
    // if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
    //     filteredTodos = _.filter(filteredTodos, function (todo) {
    //         return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
    //     }); //toLowerCase removes case sensetive while searching.
    // }
    // //always convert arrays to json and below code returns 200 automatically if successfull.
    // res.json(filteredTodos); //before adding filtering, we wrote json(todos);
    //////////////
    // use it with sequelize
    var query = req.query;
    var where = {};

    if (query.hasOwnProperty('completed') && query.completed === 'true') {
        where.completed = true;
    } else if (query.hasOwnProperty('completed') && query.completed === 'false') {
        where.completed = false;
    }

    if (query.hasOwnProperty('q') && query.q.length > 0) {
        where.description = {
            $like: '%' + query.q + '%'
        }
        ;
    }

    db.todo.findAll({where: where}).then(function (todos) {
        res.json(todos);
    }, function (err) {
        res.status(500).send();
    });
});
// GET /todos/:id
app.get('/todos/:id', function (req, res) {
    //we have to parse req.params.id to int because any request parameters are always STRING. In order to match it with an INT number, we have to convert it.
    var todoId = parseInt(req.params.id, 10); //parseInt(string, radix);
    // Specify 10 for the decimal numeral system commonly used by humans
    // // Iterate over todos array. Find the match.
    //
    // // var matchedTodo;
    // // todos.forEach(function (todo) {
    // //     //todoId was string, todo.id was int. We converted todoId to INT above.
    // //     if (todoId === todo.id) {
    // //         matchedTodo = todo;
    // //     }
    // // });
    // //ustteki kodu kullanmak yerine underscore kutuphanesinden _.findWhere fonksiyonunu kullanabiliriz.
    // var matchedTodo = _.findWhere(todos, {id: todoId});
    // //_.findwhere is a function from underscore library.
    // //_.findWhere(list, properties)
    // if (matchedTodo) {
    //     res.json(matchedTodo);
    // } else {
    //     res.status(404).send();
    // }
    ///////////
    ////use it with sequelize
    db.todo.findById(todoId).then(function (todo) {
        if (!!todo) { // means taking the value that is not a boolean. Its either an object, or null. You convert it into its truthty.
            // e.g: object is truthy, you put !! it becomes a boolean, in case of null, ! would flip it to true, 2nd ! would flip it to falase.
            res.json(todo.toJSON());
        } else {
            res.status(404).send();
        }
    }, function (err) {
        res.status(500).json(err);
        //500 = internal server error. Show if server crashes, or there is issue with db.
    });
});

// POST /todos
// use new npm dependency called body-parser - npm install body-parser@1.13.3 --save
app.post('/todos', function (req, res) {
    // var body = req.body;
    var body = _.pick(req.body, 'description', 'completed');
    // _.pick(object, keys) - senin belirledigin key leri kaydediyor.
    // sadece description&completed keylerini storelamak istiyoruz. Baska bir key daha yazilirsa, onu kaydetmez.
    // Bir nevi filtering.
    //Id kismini yazmamiza gerek yok cunku kod kendisi id belirliyor assagida. Kullanicidan almiyor degeri.

    // //this if statement is useful for validating the objects.
    // if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
    //     return res.status(400).send();                                      //trim removes before and after a string
    // } // 400 = badRequest
    //
    // //add id field
    // body.id = todoNextId++;
    // //set body.description to trimmed body.description in order to get rid of the spaces.
    // body.description = body.description.trim();
    //
    // //push body into array
    // todos.push(body);
    //
    // res.json(body); //pass back body to user.
    /////////////////////////
    //now use post with sequelize
    //challenge: call create on db.todo
    //  responsd with 200 and value of todo object.(use .toJSON()
    //  else, show error (res.status(400).json(err);
    db.todo.create(body).then(function (todo) {
        res.json(todo.toJSON());
    }, function (err) {
        res.status(400).json(err);
    })

});

// DELETE /todos/:id
app.delete('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    // var matchedTodo = _.findWhere(todos, {id: todoId});
    // if (matchedTodo) {
    //     todos = _.without(todos, matchedTodo);
    //     res.json(matchedTodo);
    // } else {
    //     return res.status(404).json({"error": "no todo found with that id"});
    // }
    ////////////////
    // use it with sequelize
    db.todo.destroy({
        where: {
            id: todoId
        }
    }).then(function (rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({
                error: 'No todo with id ' + todoId
            });
        } else { //else works when the row is deleted.
            res.status(204).send();//204 means everything went well but there is nothing to show.
        }
    }, function () {
        res.status(500).send();
    })
});

// PUT(update) /todos/:id
app.put('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});
    var body = _.pick(req.body, 'description', 'completed');
    var validAttributes = {};

    if (!matchedTodo) {
        return res.status(404).send();
    }

    //to do validation, we don't require that the field exists, if it does, we do require that it meets the standards.
    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed')) {
        // Bad -- body has completed property but it isn't a boolean.
        return res.status(400).send();
    }

    if (body.hasOwnProperty('description') && _.isString(body.completed) && body.description.trim().length > 0) {
        validAttributes.description = body.description;
    } else if (body.hasOwnProperty('description')) {
        // Bad -- body has completed property but it isn't a boolean.
        return res.status(400).send();
    }

    // HERE
    _.extend(matchedTodo, validAttributes); // updating
    res.json(matchedTodo); //this automatically sends 200.

});

//db.sequelize = sequelize; from db.js
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {//second one is callback function.
        console.log('Listening on PORT: ' + PORT);
    });
})

