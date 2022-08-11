import React, {useEffect, useState} from "react";
import '../styles/ChatHeader.css';
import Ravatar from 'react-avatar';

function ChatHeader(props) {

    return(
        <div className="chat-header">
            <div style={{width: 50}}>
                <Ravatar name={props.selectedChat} size="50" round={15}/>
            </div>
            <div style={{overflow: 'hidden', paddingTop: 5, margin: "10px"}}>
                <div className="panel-message">{props.selectedChat}</div>
            </div>
        </div>
    );
}

export default ChatHeader;