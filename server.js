const express = require('express');
const app=express();
const server=require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


users=[];
connections=[];

  app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
  });

  server.listen(8080, () => {
   console.log('Server running on port 8080');
 });


 
  io.on('connection',(socket)=>{

     connections.push(socket);
     console.log('user connected: %s online',connections.length);
   
     socket.on('disconnect',(data)=>{
        connections.splice(connections.indexOf(socket),1);
        console.log('User disconnected: %s online',connections.length);
     });

     socket.on('send message',(msg)=>{
        io.emit('new message',msg);
     });

  });