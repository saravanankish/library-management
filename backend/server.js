// imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


//import routes
const signupRoute = require('./routes/signupRoute');
const loginRoute = require('./routes/loginRoute');
const userRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoute');

const app = express();

app.use(express.json());
app.use(cors("*"));

//variables
const port = process.env.PORT || 9000;


//DB connection

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("DB connection established"))
.catch((err) => console.log(`DB connection err : ${err}`));


app.use('/', signupRoute);
app.use('/', loginRoute);
app.use('/', userRoute);
app.use('/', adminRoute);

app.listen(port, () => {
    console.log(`Listening to localhost:${port}`);
})