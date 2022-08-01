package com.me;
import io.vertx.core.AbstractVerticle;

public class Main extends AbstractVerticle {

    @Override
    public void start() throws Exception {
        System.out.println("Message app starting...");
        new AppServer().run(vertx);
        deployVerticle(MessageRepository.class.getName());
    }

    protected void deployVerticle(String className) {
        vertx.deployVerticle(className, res -> {
            if (res.succeeded()) {
                System.out.printf("Deployed %s verticle \n", className);
            } else {
                System.out.printf("Error deploying %s verticle:%s \n", className, res.cause());
            }
        });
    }

}