const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
// const socketIO = require("socket.io");
// const CommentSchema = require("./models/commentModel.js");
// const UserSchema = require("./models/userModel.js");

const app = express();
require("dotenv").config();

app.use(cookieParser());

const roomRoutes = require("./routes/room");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Grwthx application again too." });
});

app.use(bodyParser.json());
// app.use("/images", express.static(path.join(__dirname, "images")));
// const allowedOrigins = ["http://localhost:8081", "https://grwthx.grwth.hk", "https://play.grwth.hk"];

// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   console.log("origin---", origin);
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");

//   if ("OPTIONS" == req.method) {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });

app.use(cors({ origin: true }));
app.use("/api", roomRoutes);


const server = http.createServer(app);
server.listen(3001, () => {
  console.log("Server connected");
});

// const io = socketIO(server, {
//   cors: {
//     origin: ["http://localhost:8081", "https://grwthx.grwth.hk", "https://grwthx.grwth.hk/api", "https://play.grwth.hk/api"],
//     methods: ["GET", "POST"],
//   },
// });

// mongoose
//   .connect(
//     "mongodb://localhost:27017/grwthx", //db connect
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       family: 4,
//     }
//   )
//   .then(() => {
//     io.on("connection", (socket) => {
//       console.log("Socket Connected");

//       socket.on("subscribe", (roomId) => {
//         console.log(`Subscribing to room ${roomId}`);
//         socket.join(roomId);
//       });

//       socket.on("newComment", async ({ roomId, senderId, message }) => {
//         console.log(senderId)
//         const user = await UserSchema.find({ _id: senderId }).exec();

//         console.log(senderId, user[0].nameEn);

//         const newComment = new CommentSchema({
//           message: message,
//           senderId: senderId,
//           senderNameEn: user[0].nameEn,
//           senderNameZh: user[0].nameZh,
//           senderHeadImg: user[0].headImg,
//           senderUserId: user[0].userId, 
//           roomId: roomId,
//           read: false,
//         });
//         await newComment.save();

//         io.to(roomId.toString()).emit("newComment", newComment);
//       });

//       socket.on("getComments", async (roomId) => {
//         if(roomId){
//           const comments = await CommentSchema.find({ roomId }).exec();

//           socket.emit("comments", comments);
//         }        
//       });

//       socket.on("disconnect", () => {
//         console.log("Client disconnected");
//       });

//       socket.on("error", (error) => {
//         console.log("connet error", error);
//       });
//     });
//     server.listen(3000, () => {
//       console.log("Server connected");
//     });
//   })
//   .catch((error) => {
//     console.log("Connection to player-db failed", error);
//   });
