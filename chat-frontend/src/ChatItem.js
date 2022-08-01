import React, {useState} from "react";

function ChatItem(props) {
    const [showDate, setShowDate] = useState(false);


    const handleItemClick = (e) => {
        setShowDate(!showDate);
    };

    var cssClass = props.type === 1 ? 'chat-item-owner' : 'chat-item-other';
    var cssContentClass = props.type === 1 ? 'chat-item-content-owner' : 'chat-item-content-other';

    return (
        <div onClick={handleItemClick} className={'chat-item chat-item-outer ' + cssClass}>
            <div className={'chat-item ' + cssClass}>
                <div className={'chat-item-content ' + cssContentClass}>{props.sender + ' to ' +
                    props.sentTo + ': ' + props.content + ' - ' + props.type}</div>
            </div>
            {showDate ?
                <div className={'chat-item-date'}>{props.date}</div> : ''}
        </div>
    );
}

export default ChatItem;