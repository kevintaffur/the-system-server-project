import app from "./app";
import http from "http";
import logger from "./utils/logger";

const server = http.createServer(app);

server.listen(3001, () => {
  logger.info("Server running on port 3001");
});
