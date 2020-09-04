const express = require('express');
const {session} = require('cookie-session');
const {check, validationResult} = require('express-validator');
const userRepository = require('../../repository/users');
const singUpTemplate = require('../../views/admin/auth/signup')
const singInTemplate = require('../../views/admin/auth/signin')
const {
    requireEmail,
    password,
    confirmPassword,
    userEmailIsValid,
    isUserPasswordValid
} = require('./validator')
const router = express.Router();
router.get('/signup', (req, res) => {
    res.send(singUpTemplate({}))
});

router.post('/signup', [
    requireEmail, password, confirmPassword
], (async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send(singUpTemplate({req, errors}))
    }
    const {email, password, confirmPassword} = req.body;
    const user = await userRepository.create({email, password});
    req.session.userId = user.id;
    res.send('Account created !');


}));
router.get('/login', (req, res) => {
    res.send(singInTemplate({}))
})
router.post('/login', [userEmailIsValid, isUserPasswordValid],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(singInTemplate({req, errors}));
        }
        const {email} = req.body;
        const user = await userRepository.getOneBy({email})
        req.session.userId = user.id;
        res.send('you are logged in!');

    });
router.get('/singnout', (req, res) => {
    req.session = null;
    res.redirect('/signup');
});

module.exports = router;
