const express = require("express");
const app=express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port=8080;

let taxiSocket=null;
let passengerSocket=null;

io.on("connection",socket=>{
    console.log("a user connected");

socket.on("taxiRequest",routeResponse => {
    passengerSocket = socket;
    console.log("Someone wants a taxi")
    if(taxiSocket != null){
       taxiSocket.emit("taxiRequest",routeResponse); 
    }
});

socket.on("driverLocation",(driverLocation)=> {
    passengerSocket.emit("driverLocation",driverLocation);
})

socket.on("passengerRequest",routeResponse => {
    console.log("Someone wants a passenger");
    taxiSocket= socket;
});
});

server.listen(port, () => console.log("server running on port:" + port));