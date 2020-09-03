module.exports = {
     getError (errors, prop){
        try {
            if(errors){
                return errors.mapped()[prop].msg;
            }
        }catch (e) {
            return '';
        }

    }
};
