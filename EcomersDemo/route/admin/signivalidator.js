const {check} = require('express-validator');
const userRepository = require('../../repository/users');
module.exports = {
    isEmailValid: check('email').trim().normalizeEmail().isEmail()
        .custom(async (email,{req})=>{
           const user = await  userRepository.getOneBy({email});
           if (!user){
               return Promise.reject(new Error('Email not found'));
           }
        }),
    isPasswordValid: check('password').trim().custom(async (password,{req})=>{
        const user = await userRepository.getOneBy({email:req.body.email});
        if (!user){
            return Promise.reject('Password incorrect');
        }
        const isMatch = await userRepository.comparePassword(user.password, password);
        if (!isMatch){
            return Promise.reject('Password incorrect');
        }
     })

}
