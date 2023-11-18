const express = require('express');
const path = require('path');
const errorMiddleware = require('./middleware/error');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const user = require('./route/userRoute');
const vendor = require('./route/vendorRoute')

app.use('/api/v1', user);
app.use("/api/v1", vendor);


// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
} else {
    app.get('/', (req, res) => {
        res.send('Server is Running! 🚀');
    });
}

// error middleware
app.use(errorMiddleware);

module.exports = app;