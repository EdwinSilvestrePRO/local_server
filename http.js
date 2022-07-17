import http from "http";
import {webserver} from "./sources/ws.js";

const server = http.createServer();
server.listen(2000, "127.80.70.5");

server.on("request", webserver);
