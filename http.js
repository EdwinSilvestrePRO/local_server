import http from "http";

import {webserver} from "./sources/ws.js";

const server = http.createServer();

server.listen(2000, "127.80.70.5", ()=> console.log("Running Server... http://127.80.70.5:2000"));

server.on("request", webserver);
