const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { initializeDatabase } = require("./config/db");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const issueRoutes = require("./routes/issueRoutes");

const app = express();
const frontendPath = path.join(__dirname, "..", "frontend");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(frontendPath));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/issues", issueRoutes);

app.get("/api/health", (request, response) => {
  response.json({
    success: true,
    message: "Server is running"
  });
});

app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: "Route not found"
  });
});

const port = process.env.PORT || 5000;

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database initialization failed", error);
  });
