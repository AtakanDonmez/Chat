package com.me;

import java.util.UUID;

public class Message {

    private String sender;
    private String content;
    private UUID guid;

    public Message() {

    }

    public Message(String sender, String content, UUID guid) {
        super();
        this.sender = sender;
        this.content = content;
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

    public UUID getGuid() {
        return guid;
    }

    public void setGuid(UUID guid) {
        this.guid = guid;
    }

}