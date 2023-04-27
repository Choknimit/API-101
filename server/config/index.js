require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    DOMAIN_PHOTO_LOCAL: process.env.DOMAIN_PHOTO_LOCAL,
    JWT_SECRT: process.env.JWT_SECRT
}