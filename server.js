const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')



const app = express();
app.use(cors());


app.use(express.json());


mongoose.connect('mongodb+srv://zirirgb:lNARbnDyvSNXTgOt@cluster0.jegd0ju.mongodb.net/?appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

// Routes
//Auth
const authRouter = require('./routes/authRoutes');
app.use('/auth', authRouter);
//video

const videoRouter = require('./routes/videoRoutes');
app.use('/videoRouter', videoRouter);

const PORT = 3010;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
