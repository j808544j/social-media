const express = require("express");
const app = express();
const logger = require("./utils/logger");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const createErrorMiddleware = require("./middleware/error");
const authenticate = require("./routes/authenticate");
const followUser = require("./routes/followUser");
const unfollowUser = require("./routes/unfollowUser");
const userDetails = require("./routes/userDetails");
const registration = require("./routes/registration");
const newPost = require("./routes/newPost");
const deletePost = require("./routes/deletePost");
const likePost = require("./routes/likePost");
const unlikePost = require("./routes/unlikePost");
const comment = require("./routes/comment");
const postDetails = require("./routes/postDetails");
const allPosts = require("./routes/allPosts");
const connectToDatabase = require("./config/database");
connectToDatabase;

const environment = process.env.NODE_ENV || "development";
const errorMiddleware = createErrorMiddleware(logger);
dotenv.config({ path: `.env.${environment}` });

app.use(bodyParser.json());

app.use("/", authenticate);
app.use("/", followUser);
app.use("/", unfollowUser);
app.use("/", userDetails);
app.use("/", registration);
app.use("/", newPost);
app.use("/", deletePost);
app.use("/", likePost);
app.use("/", unlikePost);
app.use("/", comment);
app.use("/", postDetails);
app.use("/", allPosts);

connectToDatabase()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    logger.error("Exiting application due to error.", e);
    process.exit(1);
  });
app.use(errorMiddleware);
