const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
//import
const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");

const port = process.env.PORT || 8001;
//app
const app = express();

//database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database is connected !"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
//route
app.use("/api", authRouter);
app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
