const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.kqofl00.mongodb.net/${process.env.DB_NAME}`
    );
    console.log("Database has been connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
