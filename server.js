/**
 * Created by 张铭纹 on 2016/12/15.
 */
// var http = require('http'),
//
//     server = http.createServer(function (req,res) {
//         res.writeHead(200,{
//             'content-Type' : 'text/html'
//         });
//         res.write('test');
//         res.end();
//     });
// server.listen(7070);


// var express = require('express'),
//     app = express(),
//     server = require('http').createServer(app); //create server
// app.use('/', express.static(__dirname + '/chat'));//html file path
// server.listen(7070);


    //server
var express = require('express'),
    app = express(),
    server = require('http').createServer(app), //create server
    io = require('socket.io').listen(server);// require socket.io and bink to server
app.use('/', express.static(__dirname + '/chat'));//html file path
server.listen(7070);

    //socket
// io.on('connection', function(socket) {
//     //接收并处理客户端发送的foo事件
//     socket.on('foo', function(data) {
//         //将消息输出到控制台
//         // console.log(data);
//     })
// });





console.log('server started on localhost:7070');
