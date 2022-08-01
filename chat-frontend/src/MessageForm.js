import React, {useState} from "react";
import './MessageForm.css';

var xhr;

function MessageForm(props) {
    const [content, setContent] = useState('');
    const [sender, setSender] = useState('john');


    const handleChangeContent = (event) => {
        setContent(event.target.value);
    }

    const handleChangeSender = (event) => {
        setSender(event.target.value);
    }

    const toSenderOption = (g) => {
        return (<option key={g.value} value={g.value}>{g.label}</option>)
    }

    const tryCreateMessage = () => {
        xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/messages")
        xhr.send(JSON.stringify({"content": content, "sender": sender}));
        xhr.addEventListener("readystatechange", processRequest, false);
    }

    const processRequest = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            props.eventDispatcher.dispatch("addMessage", "")
            setContent("");
        }
    }

    return (
        <>
            <form className="message-form" onSubmit={tryCreateMessage}>
                <span className="message-form-element">
                    <label>Message&nbsp;
                        <input type="text" value={content} onChange={handleChangeContent}/>
                    </label>
                </span>
                <span className="message-form-element">
                    <label>Sender&nbsp;
                        <select value={sender} onChange={handleChangeSender}>
                            {props.senders.map(toSenderOption)}
                        </select>
                    </label>
                </span>
                <span className="message-form-element">
                    <input type="submit" value="Submit"/>
                </span>
            </form>
        </>
    )

}

export default MessageForm;