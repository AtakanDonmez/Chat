import React, {useEffect, useState} from "react";
import '../styles/ChatList.css';
import Scrollbars from "react-custom-scrollbars-2";
import Ravatar from 'react-avatar';
import ChatItem from "./ChatItem";

function ChatList(props) {

    const [chats, setChats] = useState([]);
    // const [selectedChat, setSelectedChat] = useState(-1);

    useEffect( () => {
        setChats(props.senders);
    }, [])

    // const handleChangeChat = (e, idx) => {
    //     setSelectedChat(idx);
    // }

    const toChat = (m, idx) => {
        var isSelected = idx === props.selectedChat;
        var cssClass = isSelected ? "chat-list-item-selected" : "chat-list-item"
        return (
            <div key={idx} className={cssClass}
                 onClick={ (e) => props.handleChangeChat(e, idx)}>
                <Ravatar name={m.label} size="50" round={true}/>
                <div style={{margin: "8px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                    {m.label}</div>
            </div>
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