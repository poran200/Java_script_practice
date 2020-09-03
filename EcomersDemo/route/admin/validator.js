const {check} = require('express-validator');
const userRepository = require('../../repository/users');
module.exports = {
    requireEmail: check('email').trim().normalizeEmail().isEmail().custom(async (email) => {
        const existingUser = await userRepository.getOneBy({email});
        if (existingUser) {
            return Promise.reject('Email is already registered');
        }
    }),
    password: check('password')
        .trim()
        .isLength({min: 4, max: 20}).withMessage('Must be at least 4 and max 20 '),

    confirmPassword: check('confirmPassword').trim().custom(async (confirmPassword, {req}) => {
        if (confirmPassword !== req.body.password) {
            return Promise.reject('Password is incorrect match');
        }
    })

};
