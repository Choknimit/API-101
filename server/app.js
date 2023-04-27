const express = require('express');
const bodyParser = require('body-parser')
var path = require('path');
const config = require('./config/index')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const passport = require('passport')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const PORT = config.PORT || PORT;

const app = express();
app.use(cors());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.use(helmet())

require('./config/database').connect();

app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


const userRoute = require('./routes/users-router');
const staffRouter = require('./routes/staff-router');
const shopRouter = require('./routes/shop-router');

app.use(passport.initialize())

app.use('/user', userRoute);
app.use('/staff', staffRouter);
app.use('/shop', shopRouter);

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});