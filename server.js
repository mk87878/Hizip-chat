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
    io = require('socket.io').listen(server),// require socket.io and bink to server
    users = [];//nickname array

app.use('/', express.static(__dirname + '/chat'));//html file path
server.listen(7070);

    //socket
io.on('connection', function(socket) {
    //昵称设置
    socket.on('login', function(nickname) {
       if(users.indexOf(nickname) > -1){
           socket.emit('nickExisted');
       }else{
           socket.userIndex = users.length;
           socket.nickname = nickname;
           users.push(nickname);
           socket.emit('loginSuccess');
           io.sockets.emit('system', nickname, users.length, 'login'); //向所有连接到服务器的客户端发送当前登陆用户的昵称
       }
    });

    //断开连接的事件
    socket.on('disconnect', function () {
        users.splice(socket.userIndex, 1);//将断开连接的用户从users中删除
        socket.broadcast.emit('system', socket.nickname, users.length, 'logout');//通知除自己以外的所有人
    });

    //接收新消息
    socket.on('postMsg',function (msg) {
        //将消息发送到除自己外的所有用户
        socket.broadcast.emit('newMsg', socket.nickname, msg);
    })

});

console.log(users);





console.log('server started on 127.0.0.1:7070');
