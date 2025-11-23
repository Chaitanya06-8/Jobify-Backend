const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");

app.use(cookieParser(process.env.COOKIE_SECRET));


const whitelist = [
  "https://jobify-beta-six.vercel.app",
  "http://localhost:5173"
];


const corsOptions = {
  origin: function (origin, callback) {
  
    if (!origin) return callback(null, true);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  preflightContinue: false, 
  optionsSuccessStatus: 204
};


app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

// Middlewares
app.use(express.json());

// Custom Middlewares
const { authenticateUser } = require("./Middleware/UserAuthenticationMiddleware");

// Routers
const JobRouter = require("./Router/JobRouter");
const UserRouter = require("./Router/UserRouter");
const AuthRouter = require("./Router/AuthRouter");
const AdminRouter = require("./Router/AdminRouter");
const ApplicationRouter = require("./Router/ApplicationRouter");


// Connecting routes
app.use("/api/v1/Jobs", authenticateUser, JobRouter);
app.use("/api/v1/Users", authenticateUser, UserRouter);
app.use("/api/v1/Auth", AuthRouter);
app.use("/api/v1/Admin", authenticateUser, AdminRouter);
app.use("/api/v1/Application", authenticateUser, ApplicationRouter);

module.exports = app;

