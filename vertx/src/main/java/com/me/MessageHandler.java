package com.me;

import io.vertx.core.Handler;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.ext.bridge.BridgeEventType;
import io.vertx.ext.web.handler.sockjs.BridgeEvent;

import java.util.Optional;

public class MessageHandler implements Handler<BridgeEvent> {

    private static final Logger logger = LoggerFactory.getLogger(MessageHandler.class);
    private final EventBus eventBus;

    MessageHandler(EventBus eventBus) {
        this.eventBus = eventBus;
    }

    @Override
    public void handle(BridgeEvent event) {
        if (event.type() == BridgeEventType.SOCKET_CREATED)
            logger.info("A socket was created");

        if (event.type() == BridgeEventType.SEND)
            clientToServer();

        event.complete(true);
    }

    private void clientToServer() {
        Integer value = 1;
        eventBus.publish("out", value);
    }
}