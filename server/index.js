const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const homeRoutes = require('./routes/homeRoutes');
const statsRouter = require('./routes/statsRouter');
const connectDB = require('./config/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

connectDB();

app.use('/home', homeRoutes);

app.use('/admin', adminRoutes);

app.use('/stats', statsRouter);
