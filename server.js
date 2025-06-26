const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

dotenv.config();

connectDB();


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/test', require('./routes/testroutes'));
app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/user', require('./routes/userroutes'));
app.use('/api/restaurant', require('./routes/restaurantroutes'));
app.use('/api/category', require('./routes/categoryroutes'));
app.use('/api/food', require('./routes/foodroutes'));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});