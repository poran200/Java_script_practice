const express = require('express');
const {check,validationResult} = require('express-validator');
const userRepository = require('../../repository/users');
const singUpTemplate = require('../../views/admin/auth/signup')
const singInTemplate = require('../../views/admin/auth/signin')
const {requireEmail,password,confirmPassword} = require('./validator')
const {isEmailValid,isPasswordValid} = require('./signivalidator')
const router = express.Router();
router.get('/signup', (req, res) => {
    res.send(singUpTemplate({req}))
});

router.post('/signup',[
    requireEmail,password,confirmPassword
], (async (req, res) => {
    const  errors = validationResult(req);
    if (!errors.isEmpty()){
        res.send(singUpTemplate({req,errors}))
    }else {
        const {email, password, confirmPassword} = req.body;
        const user = await userRepository.create({email, password});
        req.session.userId = user.id;
        res.send('Account created !');
    }

}));
router.get('/login', (req, res) => {
    res.send(singInTemplate())
})
router.post('/login',[isEmailValid,isPasswordValid], async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()){
         console.log(errors);
         res.send(singInTemplate(errors))
     }else {
         const {email} = req.body;
         const user = await userRepository.getOneBy({email})
         req.session.userId=user.id;
         res.send('you are logged in!');
     }
});
router.get('/singnout', (req, res) => {
    req.session = null;
    res.redirect('/signup');
});

module.exports = router;
