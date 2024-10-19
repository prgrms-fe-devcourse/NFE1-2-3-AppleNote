#!/usr/bin/env node

import http from "http";
import "dotenv/config";

import app from "../app";
import { Logger } from "../utils/Logger";
import { connectDatabase } from "@src/config";
import { MongooseDatabase } from "@src/config/MongooseDatabase";

const validationPort = (port: string | undefined) => {
  if (!port) {
    throw new ReferenceError("Must be a valid port.");
  }

  return port;
};

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      Logger.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      Logger.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  Logger.log(`listening on http://localhost:${port}/`);
  connectDatabase(new MongooseDatabase());
};

const port = validationPort(process.env.PORT);

app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
