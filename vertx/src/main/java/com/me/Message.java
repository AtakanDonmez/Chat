package com.me;

import java.util.UUID;

public class Message {

    private String sender;
    private String content;
    private String sentTo;
    private String dateTime;
    private UUID guid;

    public Message() {

    }

    public Message(String sender, String content, String sentTo, String dateTime, UUID guid) {
        super();
        this.sender = sender;
        this.content = content;
        this.sentTo = sentTo;
        this.dateTime = dateTime;
        this.guid = guid;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSentTo() {
        return sentTo;
    }

    public void setSentTo(String sentTo) {
        this.sentTo = sentTo;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public UUID getGuid() {
        return guid;
    }

    public void setGuid(UUID guid) {
        this.guid = guid;
    }

}