package com.me;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
            MESSAGE_LIST.add(message);
            msg.reply(Json.encode(message));
        });

        vertx.eventBus().consumer("service.message-get", msg -> {
            msg.reply(Json.encode(MESSAGE_LIST));
        });
    }

}