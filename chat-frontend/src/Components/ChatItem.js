import React, {useState} from "react";
import '../styles/ChatItem.css';

function ChatItem(props) {
    const [showDate, setShowDate] = useState(false);


    const handleItemClick = (e) => {
        setShowDate(!showDate);
    };

    var cssClass = props.type ? 'owner' : 'other';

    return (
        <div onClick={handleItemClick} className={'chat-item-outer'}>
            <div className={'chat-item-' + cssClass}>
                <div className={'chat-item-content-' + cssClass}>{props.sender + ' to ' +
                    props.sentTo + ': ' + props.content + ' - ' + props.type}</div>
            </div>
            {showDate ?
                <div className={'chat-item-date-' + cssClass}>{props.date}</div> : ''}
        </div>
    );
}

export default ChatItem;