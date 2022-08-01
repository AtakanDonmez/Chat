import './MessageList.css';
import React, {useState, useEffect} from "react";

var xhr;

function MessageList(props) {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        sendRequest();
    }, [])

    const valueToLabel = (g) => {
        var label = "?";
        for (var i = 0; i < props.senders.length; i++) {
            if (props.senders[i].value == g) {
                label = props.senders[i].label;
                break;
            }
        }

        return label;
    }

    const toMessage = (m) => {
        var g = valueToLabel(m.sentTo);
        return (<tbody key={m.guid}>
        <tr>
            <td>{m.content}</td>
            <td>{m.sender}</td>
            <td>{g}</td>
            <td>{m.dateTime}</td>
        </tr>
        </tbody>);
    }

    const sendRequest = () => {
        xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/messages");
        xhr.send();
        xhr.addEventListener("readystatechange", processRequest, false);
    }

    const processRequest = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            setMessages(response);
        }
    }

    props.eventDispatcher.subscribe("addMessage", sendRequest);

    return (
        <table className={"message-list"}>
            <tbody>
            <tr>
                <th>Message</th>
                <th>Sender</th>
                <th>SentTo</th>
                <th>DateTime</th>
            </tr>
            </tbody>
            {messages?.map(toMessage)}
        </table>
    );
}

export default MessageList;
