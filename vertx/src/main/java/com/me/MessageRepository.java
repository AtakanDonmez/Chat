package com.me;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.json.Json;

public class MessageRepository extends AbstractVerticle {

    private static final List<Message> MESSAGE_LIST = new ArrayList<>();

    @Override
    public void start() throws Exception {
        System.out.println("MessageRepository starting...");

        vertx.eventBus().consumer("service.message-add", msg -> {
            Message message = Json.decodeValue((String)msg.body(), Message.class);
            message.setGuid(UUID.randomUUID());
            String dateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"));
            message.setDateTime(dateTime);
            MESSAGE_LIST.add(message);
            msg.reply(Json.encode(message));
        });

        vertx.eventBus().consumer("service.message-get", msg -> {
            List<Message> matching_messages = new ArrayList<>();
            String sender = msg.headers().get("sender");
            String sentTo = msg.headers().get("sentTo");
            for (int i = 0; i < MESSAGE_LIST.size(); i++) {
                if ( (MESSAGE_LIST.get(i).getSender().equals(sender) && MESSAGE_LIST.get(i).getSentTo().equals(sentTo))
                    || (MESSAGE_LIST.get(i).getSender().equals(sentTo) && MESSAGE_LIST.get(i).getSentTo().equals(sender)) ){
                    matching_messages.add(MESSAGE_LIST.get(i));
                }
            }
//            System.out.println("sender: " + msg.headers().get("sender") + " sentTo: " + msg.headers().get("sentTo"));
            msg.reply(Json.encode(matching_messages));
        });
    }

}