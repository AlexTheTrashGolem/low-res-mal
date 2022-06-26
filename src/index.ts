import server from "./server";
import {logger} from "./logger/winlog";
(async () => {
  //await server.initLocalDatabases();
  await server.initServer((process.env.PORT || "3000"), "0.0.0.0");
})();
logger.info("server starting");
