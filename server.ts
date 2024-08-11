import app from "./src/app";
import { config } from "./src/config/config";
import connectDB from "./src/config/db";

const startServer = async () => {
  await connectDB();

  const port = config.port || 3000;
  const server = app.listen(port, () => {
    console.log(`Listening on port : ${port}`);
  });

  // Graceful shutdown on process termination or restart
  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("Process terminated");
    });
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Process interrupted");
    });
  });
};

startServer();
