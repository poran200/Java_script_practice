const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./route/admin/auth');
 const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieSession({
    keys: ['hhafeuhh34']
}));
app.use(authRouter);
app.listen(8080, () => {
    console.log("listening");
})

// console.log("Hi there");
