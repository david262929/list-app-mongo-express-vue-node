module.exports = {
  NODE_ENV: process.env.NODE_ENV || `development`,
  MONGODB_URI: process.env.MONGO_URI || `mongodb://localhost:27017/list-app-mongo-express-vue-node`,
  PORT: process.env.PORT || 5003
}
