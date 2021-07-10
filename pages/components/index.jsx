import styles from "./components.module.scss";
import io from 'socket.io-client';
import React from "react";
import { SERVER_URL, } from "libs/const";

const socket = io(`${SERVER_URL}`, {
    query: {
        id: 100000
    }
});

const ComponentsPage = () => {
    
    const [socketId, setSocketId] = React.useState(0);
    
    const [messages, setMessages] = React.useState([]);
    const [mess, setMess] = React.useState("");
    React.useEffect(() => {
        socket.on('connection', (message) => {
            console.log('server connected');
            setSocketId(message.id);
          });
        socket.on('disconnect', () => {
            console.log('server disconnected');
        });
        socket.on("receive", (message) => {
            let mes = "Server: " + message;
            let list = messages;
            list.push(mes);
            setMessages(Array.from(list));
        })
        socket.on("visit", (message) => {
            let mes = "Visit: " + message;
            let list = messages;
            list.push(mes);
            setMessages(Array.from(list));
        })
    },[]);
    const handleOnClick = () => {
        socket.emit("send", mess);
    }
    return <div className = {styles.Component}>
        <input value = {mess} onChange = {(event) => {
            setMess(event.target.value);
        }}/>
        <button onClick = {handleOnClick}>Send</button>
        <div>Socket Id: {socketId}</div>
        {messages.map((v,i) => {
            return <div key = {i}>{v}</div>
        })}
    </div>
}

export default ComponentsPage;