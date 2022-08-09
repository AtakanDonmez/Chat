import '../styles/App.css';
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import ChatList from "./ChatList";
import {useState} from "react";
import EventBus from "@vertx/eventbus-bridge-client.js";

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
    dispatch: function (event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(function (l) {
                l(data);
            });
        }
    },
    subscribe: function (event, f) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(f)
    }
}

const eventBus = new EventBus('http://localhost:8080/eventbus');


// const ws = new WebSocket("ws://localhost:8080/eventbus/websocket");

//TODO:
// - send message on enter
// - show only the chats that have messages (add "any" to the get request)
// - new chat creation
// - show last messages on chats
// - show chats with new notifications on the chatlist
// - Define users on backend
// - avatar?
// - widget
// - postgresql
// - message time like twitter or wa?
// - message day separators?

// DONE DoD:
// - move filtering to backend
// - New message scroll down like hey app message panel


function App() {

    const [selectedChat, setSelectedChat] = useState(-1);
    const [chatUpdater, setChatUpdater] = useState(false);

    const handleChangeChat = (e, idx) => {
        setSelectedChat(idx);
    }

    const updateChat = () => {
        eventBus.send('in');
    }

    eventBus.onopen = function () {
        eventBus.registerHandler('out', function (error, message) {
            setChatUpdater(prevState => !prevState);
            console.log("update chat: " + chatUpdater);
        });
    }

    // ws.onopen = (event) => {
    //     console.log("WebSocket opened");
    // };
    //
    // ws.onmessage = (event) => {
    //     console.log("ws message: " + event.data);
    // };

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
                                 eventDispatcher={eventDispatcher} chatUpdater={chatUpdater}/>
                </div>
                <div className="message-form-row">
                    <MessageForm senders={senders} sentTo={senders[selectedChat]?.value}
                                 eventDispatcher={eventDispatcher} updateChat={updateChat}/>
                </div>
            </div>
        </div>
    );
}

export default App;
