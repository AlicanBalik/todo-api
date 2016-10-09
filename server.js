/**
 * Created by alicanbalik on 10/9/16.
 */

var express = require('express');
var app = express(); // we call express variable as a function.
var PORT = process.env.PORT || 1992;
var todos = [{
    id: 1,
    description: 'Find a girl',
    completed: false
},
    {
        id: 2,
        description: 'be a successfull programmer',
        completed: false
    },
    {
        id: 3,
        description: 'don\'t die today',
        completed: true
    }];

app.get('/', function (req, res) {
    res.send('Tirmala beni kasi beni, gotur beni yatir beni!');
});

// GET /todos
app.get('/todos', function (req, res) {
    //always convert arrays to json
    res.json(todos);
});
// GET /todos/:id
app.get('/todos/:id', function (req, res) {
    //we have to parse req.params.id to int because any request parameters are always STRING. In order to match it with an INT number, we have to convert it.
    var todoId = parseInt(req.params.id, 10); //parseInt(string, base);
    // Iterate over todos array. Find the match.
    var matchedTodo;

    todos.forEach(function (todo) {
        //todoId was string, todo.id was int. We converted todoId to INT above.
        if (todoId === todo.id) {
            matchedTodo = todo;
        }
    });
    
        if (matchedTodo) {
            res.json(matchedTodo);
        } else {
            res.status(404).send();
        }

});


app.listen(PORT, function () {//second one is callback function.
    console.log('Listening on PORT: ' + PORT);
});