// imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


//import routes
const signupRoute = require('./routes/signupRoute');
const loginRoute = require('./routes/loginRoute');
const userRoute = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors("*"));

//variables
const port = process.env.PORT || 9000;


//DB connection
const connection_url = "mongodb+srv://admin:PDpCbsXHBhoYJIY1@cluster0.sn8id.mongodb.net/LibraryManager?retryWrites=true&w=majority"
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("DB connection established"))
.catch((err) => console.log(`DB connection err : ${err}`));


app.use('/', signupRoute);
app.use('/', loginRoute);
app.use('/', userRoute);

app.listen(port, () => {
    console.log(`Listening to localhost:${port}`);
})