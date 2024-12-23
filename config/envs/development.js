module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW * 60 * 1000, // minutes in milliseconds
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX, // Maximum number of requests per window
  CORS_ORIGIN: `http://localhost:${process.env.PORT}`,
  LONG_TOKEN_SECRET: process.env.LONG_TOKEN_SECRET,
  SHORT_TOKEN_SECRET: process.env.SHORT_TOKEN_SECRET,
  NACL_SECRET: process.env.NACL_SECRET,
};
