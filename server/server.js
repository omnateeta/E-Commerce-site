require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ MongoDB connection (clean version for Mongoose v6+)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://e-commerce-site-frontend.vercel.app',
  'https://e-commerce-site.vercel.app',
  'https://ecommerce-frontend.vercel.app',
  'https://ecommerce_site_frontend.vercel.app',
  'https://ecommercefrontend-ten-ochre.vercel.app'
];

// Middleware
app.use(
  cors({
    origin: function(origin, callback) {
      console.log("CORS request from origin:", origin);
      console.log("Request headers:", {
        origin: origin,
        referer: this.req?.headers?.referer,
        host: this.req?.headers?.host,
        cookie: this.req?.headers?.cookie
      });

      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        console.log("No origin, allowing request");
        return callback(null, true);
      }

      if (allowedOrigins.indexOf(origin) === -1) {
        console.log("CORS blocked for origin:", origin);
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }

      console.log("CORS allowed for origin:", origin);
      return callback(null, true);
    },
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Cookie",
      "Set-Cookie",
      "Cache-Control",
      "X-HTTP-Method-Override"
    ],
    exposedHeaders: ["Set-Cookie"],
    credentials: true,
    maxAge: 86400, // 24 hours
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// Add security headers middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log("Security headers middleware - Request details:", {
    origin: origin,
    headers: req.headers,
    cookies: req.cookies,
    method: req.method,
    path: req.path
  });
  
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, Cookie, Set-Cookie, Cache-Control');
  res.header('Access-Control-Max-Age', '86400');
  res.header('Access-Control-Expose-Headers', 'Set-Cookie');
  next();
});

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Allowed origins:", allowedOrigins);
});
