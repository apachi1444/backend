import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io('http://127.0.0.1:5000/');
//Messages msg={ msg, from, to }

function messages(io, socket){
    const message={
        message: {
            text: 'Hello',
            timeStamp: 1288473883
        },
        from: "XXXXJDJJDKJSK",
        to: "XXXXXXXXXYYYYX"
    }
    socket.emit('send-message', message);
    console.log(socket)
}

messages(io, socket)