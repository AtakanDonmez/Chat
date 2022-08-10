import React, {useState} from "react";
import '../styles/MessageForm.css';

var xhr;

function MessageForm(props) {
    const [content, setContent] = useState('');


    const handleChangeContent = (event) => {
        setContent(event.target.value);
    }

    const handleSendClick = (e) => {
        tryCreateMessage();
    }

    const tryCreateMessage = () => {
        xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/messages");
        xhr.send(JSON.stringify({"content": content, "sender": props.activeUser, "sentTo": props.sentTo}));
        xhr.addEventListener("readystatechange", processRequest, false);
    }

    const processRequest = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            props.eventDispatcher.dispatch("addMessage", "")
            setContent("");
            props.updateChat();
        }
    }

    const onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            handleSendClick();
        }
    }

    return (
        <div className="chat-footer" style={{padding: 0}}>
            <textarea id="messageTextArea" rows={1} placeholder="Type a new message"
                      value={content} onChange={handleChangeContent} onKeyDown={onEnterPress}/>
            <button type="primary" onClick={handleSendClick}>Send</button>

        </div>
    )

}

export default MessageForm;