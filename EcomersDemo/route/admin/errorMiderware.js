const {validationResult} = require('express-validator');
module.exports = {
    handelError(templateFunction){
       return (req,res,next) => {
           const errors = validationResult(req);
           // console.error(errors);
           if(!errors.isEmpty()){
               return res.send(templateFunction({errors}));
           }
           next();
       };
    },
    requireAuth(req,res,next) {
        if (!req.session.userId){
            res.redirect('/login');
        }
        next();
    }
};
