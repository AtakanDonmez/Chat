import React, {useState} from "react";
import '../styles/MessageForm.css';

var xhr;

function MessageForm(props) {
    const [content, setContent] = useState('');
    const [sender, setSender] = useState('noone');
    const [sentTo, setSentTo] = useState('john');


    const handleChangeContent = (event) => {
        setContent(event.target.value);
    }

    const handleChangeSender = (event) => {
        setSender(event.target.value);
    }

    const handleChangeSentTo = (event) => {
        setSentTo(event.target.value);
    }

    const toSenderOption = (g) => {
        return (<option key={g.value} value={g.value}>{g.label}</option>)
    }

    const toSentToOption = (g) => {
        return (<option key={g.value} value={g.value}>{g.label}</option>)
    }

    const handleMessageEnter = (e) => {

    }

    const handleSendClick = (e) => {
        tryCreateMessage();
    }

    const tryCreateMessage = () => {
        xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/messages");
        xhr.send(JSON.stringify({"content": content, "sender": sender, "sentTo": sentTo}));
        xhr.addEventListener("readystatechange", processRequest, false);
    }

    const processRequest = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            props.eventDispatcher.dispatch("addMessage", "")
            setContent("");

        }
    }

    return (
        <div className="chat-footer" style={{padding: 0}}>
            <textarea id="messageTextArea" rows={1} placeholder="Type a new message"
                      value={content} onChange={handleChangeContent}/>
            <button type="primary" onClick={handleSendClick}>Send</button>

        </div>
    )

}

export default MessageForm;