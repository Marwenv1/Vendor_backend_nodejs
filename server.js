require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
var corsOptions = {
    origin: 'https://62049e21c5a12d3ec693afa6--nifty-hopper-99960d.netlify.app/',
    optionsSuccessStatus: 200 // For legacy browser support
}


const app = express();
app.use(express.json());
app.use(cors(corsOptions));
//app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/productRouter"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/orderRouter"));

const URI = process.env.MONGO_URL;
const PORT = process.env.PORT;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("DATABASE CONNECTED...");
  }
);

app.listen(PORT, () => {
  console.log(`SERVER IS CONNECTED TO PORT ${PORT}`);
});
