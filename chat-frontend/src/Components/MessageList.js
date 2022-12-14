import '../styles/MessageList.css';
import React, {useState, useEffect, useRef} from "react";
import ChatItem from "./ChatItem";
import Scrollbars from "react-custom-scrollbars-2";

var xhr;

function MessageList(props) {

    const [messages, setMessages] = useState([]);

    const scroller = useRef(null);

    useEffect(() => {
        sendRequest();
    }, [props.selectedChat, props.chatUpdater]);

    useEffect( () => {
        scroller.current.scrollToBottom();
    }, [messages]);

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

    const toMessage = (m, idx) => {
        var g = valueToLabel(m.sentTo);
        var type = m.sender == props.activeUser;
        return (
            <ChatItem key={idx} type={type} content={m.content} date={m.dateTime} sender={m.sender}
                      sentTo={g}/>
        );
    }

    const sendRequest = () => {
        xhr = new XMLHttpRequest();
        var params = "sender=" + props.activeUser + "&sentTo=" + props.selectedChat;
        xhr.open("GET", "http://localhost:8080/messages?" + params);
        xhr.send();
        xhr.addEventListener("readystatechange", processRequest, false);
    }

    const processRequest = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            setMessages(response);
            // console.log("response:" + response);
        }
    }

    props.eventDispatcher.subscribe("addMessage", sendRequest);

    return (
        <div className={"message-list"}>
            <Scrollbars style={{height: "65vh", width: "100%"}} ref={scroller} autoHide
            autoHideTimeout={1000} autoHideDuration={200}>
                {messages?.map(toMessage)}
            </Scrollbars>
        </div>
    );
}

export default MessageList;
