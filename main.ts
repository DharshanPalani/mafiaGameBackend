import { createServer } from "http";
import { Server, Socket } from "socket.io";
import express from "express";
import cors from "cors";

const app = express();

const httpServer = createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("PING", ({ msg }) => {
    console.log(msg);
    socket.to(socket.id).emit("PONG", { return_message: "Sybau" + socket.id });
  });
});

httpServer.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
