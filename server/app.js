const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { MONGOURI } = require("./keys");

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("database connected");
});
mongoose.connection.on("error", () => {
  console.log("not connected");
});

require("./models/user"); // we will not export the model from that file as to prevent any error that say we can't use the model more than once
require("./models/posts");

app.use(express.json()); // this will tell server to parse all the incoming requests in json format
app.use(require("./routes/auth")); // app. use is a way to register middleware or chain of middlewares (or multiple middlewares) before executing  any end route logic or intermediary route logic depending upon order of middleware registration sequence
//this is how we register our routes
app.use(require("./routes/posts"));

{
  //middleware
  // const customMiddleware = (req, res, next) => {
  //   console.log("middleware executed!");
  //   next(); //It passes control to the next matching route.
  //   //this middleware will be executed first and then get will be executed
  // };
  // app.use(customMiddleware); // middle ware will be exe for all the routes
  // app.get("/", (req, res) => {
  //   //if i want the middleware to run only for this specific route then write
  //   //app.get("/",cutsomeMiddleware,(req,res)=>{});
  //   res.send("hello world");
  // });
}

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
