import http from "http";
import { app } from "./app.js";
import { PORT } from "./config/config.js";

const server = http.createServer(app);

server.listen(PORT);
