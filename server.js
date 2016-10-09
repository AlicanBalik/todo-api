/**
 * Created by alicanbalik on 10/9/16.
 */

var express = require('express');
var app = express(); // we call express variable as a function.
var PORT = process.env.PORT || 1992;

app.get('/', function(req, res) {
    res.send('Tirmala beni kasi beni, gotur beni yatir beni!');
});

app.listen(PORT, function() {//second one is callback function.
    console.log('Listening on PORT: ' + PORT);
});