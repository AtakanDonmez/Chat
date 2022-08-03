import '../styles/App.css';
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import ChatList from "./ChatList";
import {useState} from "react";

const senders = [
    {value: 'james', label: 'James'},
    {value: 'robert', label: 'Robert'},
    {value: 'john', label: 'John'},
    {value: 'mary', label: 'Mary'},
    {value: 'patricia', label: 'Patricia'},
    {value: 'noone', label: 'NOONE'}
]

// const messages = [
//     {sender: 'action', message: 'Captain Marvel', guid: '6530b64b-0753-4629-a1bb-6716109b964b'},
//     {sender: 'comedy', message: 'Groundhog Day', guid: 'ba5b9881-7128-485f-84d5-afc50f199b23'},
//     {sender: 'action', message: 'Midway', guid: '2e93da48-d451-4df0-b77c-41dddde428ad'},
//     {sender: 'drama', message: 'Dances With Wolves', guid: 'f207c1a0-3bef-48f1-a596-29b84887e94d'},
//     {sender: 'thriller', message: 'Scream', guid: '3733f942-6a44-4eb9-af54-586d9d15eb67'}
// ]

const eventDispatcher = {
    listeners: {},
    dispatch: function(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(function(l) {
                l(data);
            });
        }
    },
    subscribe: function(event, f) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(f)
    }
}

//TODO:
// - stop refresh after submit
// - The page doesnt update if post request sent from POSTMAN
// - Message Form update
// - New message scroll down like hey app message panel
// - CSS Overhaul
// - Define users on backend
// - move filtering to backend
// - implement sockets alongside http requests

function App() {

    const [selectedChat, setSelectedChat] = useState(-1);

    const handleChangeChat = (e, idx) => {
        setSelectedChat(idx);
    }

    return (
        <div className="App">
            <div className="chat-list-column">
                <ChatList senders={senders} handleChangeChat={handleChangeChat}
                          selectedChat={selectedChat}/>
            </div>
            <div className="message-panel-column">
                <h1>Chat</h1>
                <div className="message-list-row">
                    <MessageList senders={senders} selectedChat={senders[selectedChat]?.value}
                                 eventDispatcher={eventDispatcher}/>
                </div>
                <div className="message-form-row">
                    <MessageForm senders={senders} sentTo={senders[selectedChat]?.value}
                                 eventDispatcher={eventDispatcher}/>
                </div>
            </div>
        </div>
    );
}

export default App;
