const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const { SerialPort} = require("serialport");
const {ReadlineParser} = require("@serialport/parser-readline");

const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  const arduinoPort = new SerialPort({path: "COM7", baudRate: 9600 },function(err){
    if(err){
      return console.log('Error on port open: ',err.message);
    }
    console.log('Serial Port Open');
  });
  const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: "\n" }));

  parser.on("data", (data) => {
    if(data.startsWith("LS")){
    socket.emit("light-sensor", data.substring(2));
    }
    console.log(data);
  });

  socket.on("new-password", (password) => {
    arduinoPort.write(password);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log("listening on *:" + port);
});
