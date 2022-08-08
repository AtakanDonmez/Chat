package com.me;

import org.apache.commons.lang3.StringUtils;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import io.vertx.core.json.Json;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.shareddata.SharedData;
import io.vertx.core.MultiMap;
import io.vertx.ext.bridge.PermittedOptions;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.StaticHandler;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.ext.web.handler.sockjs.BridgeOptions;
import io.vertx.ext.web.handler.sockjs.SockJSHandler;

public class AppServer {

    private final Logger LOGGER = LoggerFactory.getLogger( AppServer.class );

    public void run(Vertx vertx) {
        HttpServer server = vertx.createHttpServer();

        Router router = Router.router(vertx);
        router.route().handler(BodyHandler.create());

        router.route().handler(CorsHandler.create("((http://)|(https://))localhost\\:\\d+"));
        // router.route().handler(CorsHandler.create(".*."));

        router.get().handler(StaticHandler.create());

        router.get("/messages").handler(ctx -> getMessage(ctx, vertx));

        router.post("/messages").handler(ctx -> postMessage(ctx, vertx));

        router.route("/eventbus/*").handler(eventBusHandler(vertx));
//        server.websocketHandler(websocket -> {
//            System.out.println("client connected: "+websocket.remoteAddress());
//        });

        server.requestHandler(router).listen(8080, http -> {
            if (http.succeeded()) {
                LOGGER.info("MessageApp HTTP server started on port 8080");
            } else {
                LOGGER.info("MessageApp HTTP server failed to start");
            }
        });
    }

    private void getMessage(RoutingContext ctx, Vertx vertx) {
        MultiMap parameters = ctx.queryParams();
        String sender = parameters.get("sender");
        String sentTo = parameters.get("sentTo");
        System.out.println("sender: " + sender + " sentTo: " + sentTo);
        vertx.eventBus().request("service.message-get", "", res -> {
            if ( res.succeeded() ) {
                ctx.response()
                        .putHeader("content-type", "application/json")
                        .end( res.result().body().toString() );
            } else {
                ctx.fail( res.cause() );
            }
        });
    }

    private void postMessage(RoutingContext ctx, Vertx vertx) {
        final Message message = Json.decodeValue(ctx.getBodyAsString(), Message.class);
        if (StringUtils.isEmpty(message.getSender()) || StringUtils.isEmpty(message.getContent())
                || StringUtils.isEmpty(message.getSentTo())) {
            ctx.response()
                    .setStatusCode(400)
                    .putHeader("content-type", "application/json")
                    .end("{ 'error': 'Content, Sender and SentTo must be non-empty' }");
            return;
        }
        vertx.eventBus().request("service.message-add", Json.encode(message), res -> {
            if ( res.succeeded() ) {
                ctx.response()
                        .putHeader("content-type", "application/json")
                        .end( res.result().body().toString() );
            } else {
                ctx.fail( res.cause() );
            }
        });
    }

    private SockJSHandler eventBusHandler(Vertx vertx) {
        BridgeOptions options = new BridgeOptions()
                .addOutboundPermitted(new PermittedOptions().setAddressRegex("out"))
                .addInboundPermitted(new PermittedOptions().setAddressRegex("in"));

        SharedData data = vertx.sharedData();
        EventBus eventBus = vertx.eventBus();
        MessageHandler messageHandler = new MessageHandler(eventBus);

        SockJSHandler sockJSHandler = SockJSHandler.create(vertx);
        return sockJSHandler.bridge(options, messageHandler);
    }
}