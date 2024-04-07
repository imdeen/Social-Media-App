const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AuthRoute = require("./Routes/auth.js");
const PostRoute = require('./Routes/post.js');
const UserRoute = require('./Routes/user.js');
const ChatRoute = require('./Routes/chat.js');
const MessageRoute = require('./Routes/message.js');
const UploadRoute = require('./Routes/upload.js');
const cors = require('cors');


const app = express();
//to serve images for public
app.use(express.static('public'));
app.use('/images', express.static('images'));

//middlewares
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.PORT, ()=> console.log(`listening on ${process.env.PORT}`));
}).catch((error) => console.log(error));


app.use('/auth', AuthRoute);
app.use('/post', PostRoute);
app.use('/user', UserRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);
app.use('/upload', UploadRoute)
