const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const userRepository = require('./repository/users');
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieSession({
    keys: ['hhafeuhh34']
}));
app.get('/signup', (req, res) => {
    res.send(`
     <div>
    Your Id is:  ${req.session.userId}
      <form method="post">
      <input name="email" placeholder="email">
      <input name="password" placeholder="password">
      <input name="confirmPassword" placeholder="password confirm">
      <button>Sing Up</button>
      </form>
     </div>
    `)
});

app.post('/signup', (async (req, res) => {
    const {email, password, confirmPassword} = req.body;
    const existingUser = await userRepository.getOneBy({email});
    if (existingUser) {
        res.send('Email is already registered');
    }
    if (password !== confirmPassword) {
        return res.send('Password is incorrect match');
    }

    const user = await userRepository.create({email, password});
    req.session.userId = user.id;
    res.send('Account created !');
}));
app.get('/login', (req, res) => {
    res.send(`
    <div>
    Your Id is:  ${req.session.userId}
        <form method="post">
        <input name="email" placeholder="email"/>
        <input name="password" placeholder="password"/>
        <button>Login</button>
    </form>
    </div>
    `)
})
app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await userRepository.getOneBy({email});
    if (!user) {
        res.send('User not found');
    }
    if (user.password !== password) {
       res.send('Password does not match');
    }
    req.session.userId= user.id;
    res.send('login success');
});
app.get('/singnout', (req, res) => {
    req.session = null;
    res.redirect('/signup');
});
app.listen(8080, () => {
    console.log("listening");
})

// console.log("Hi there");
