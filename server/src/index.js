const express = require("express");
const connectDB = require("./config/connectDB");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");

const { notFound, errHandler } = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 8080;

//connect to database
connectDB();

//declare routes
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const blogRoute = require("./routes/blogRoute");
const prodCategoryRoute = require("./routes/prodCategoryRoute");
const blogCatRoute = require("./routes/blogCatRoute");
const brandRoute = require("./routes/brandRoute");
const couponRoute = require("./routes/couponRoute");
const colorRoute = require("./routes/colorRoute");
const enqRoute = require("./routes/enqRoute");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//use route
app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use("/api/blog", blogRoute);
app.use("/api/blog-category", blogCatRoute);
app.use("/api/prod-category", prodCategoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/color", colorRoute);
app.use("/api/enq", enqRoute);

app.use(notFound);
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`server is runing with port ${PORT}`);
});
