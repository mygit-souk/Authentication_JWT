require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const userRouter = require('./api/routes/user.routes');

app.use(express.json());
app.use('/api/users', userRouter);

app.listen(port, () => console.log(`Server running on port ${port}...`));