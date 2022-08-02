import React, {useEffect, useState} from "react";
import '../styles/ChatList.css';
import Scrollbars from "react-custom-scrollbars-2";
import ChatItem from "./ChatItem";

function ChatList(props) {

    const [chats, setChats] = useState([]);

    useEffect( () => {
        setChats(props.senders);
    }, [])

    const toChat = (m, idx) => {
        return (
            <div key={idx} className="chat-list-item">{m.label}</div>
        );
    }


    return(
        <div className="chat-list">
            <Scrollbars style={{height: "100vh", width: "100%"}}>
                {chats?.map(toChat)}
            </Scrollbars>
        </div>
    );
}

export default ChatList;