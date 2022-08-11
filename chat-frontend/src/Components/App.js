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

//TODO:
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
// - dont allow messaging yourself
// - header

// DONE DoD:
// - will define users and messages on backend.
// - Add avatars
// Şu anda bütün odaları direk gösteriyo arka tarafta
// odaları ve mesajları checkleyerek sadece aktif chatleri display etsin.
// olmayan odaları da compose new message diyerek açacak


function App() {

    const [selectedChat, setSelectedChat] = useState(-1);
    const [chatUpdater, setChatUpdater] = useState(false);
    const [activeUser, setActiveUser] = useState("noone");

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
                                 eventDispatcher={eventDispatcher} chatUpdater={chatUpdater}
                                 activeUser={activeUser} />
                </div>
                <div className="message-form-row">
                    <MessageForm senders={senders} sentTo={senders[selectedChat]?.value}
                                 eventDispatcher={eventDispatcher} updateChat={updateChat}
                                 activeUser={activeUser} />
                </div>
            </div>
        </div>
    );
}

export default App;
