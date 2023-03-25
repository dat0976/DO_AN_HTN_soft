var express = require('express');
var app = express();
var server = require('http').Server(app);

var io =require('socket.io')(server);
server.listen(3002,function(){
    console.log("server listen on http://localhost:3002")
});
app.get('/',function(req,res){
    res.send("hello ");
});

io.on('connection', function(socket){
    console.log("ket noi id=" + socket.id);
});