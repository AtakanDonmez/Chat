import './App.css';
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";

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

function App() {
    return (
        <div className="App">
            <h1>
                Chat
            </h1>
            <div>
                <MessageList senders={senders} eventDispatcher={eventDispatcher} />
            </div>
            <div>
                <MessageForm senders={senders} eventDispatcher={eventDispatcher} />
            </div>
        </div>
    );
}

export default App;
