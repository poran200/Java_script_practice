const layout = require('../../layout');
const getError = (errors, prop) =>{
    try {
        if(errors){
            return errors.mapped()[prop].msg;
        }
    }catch (e) {
        return '';
    }

};
module.exports = (errors) => {
    return layout({
        content: `
    <div>
         <form method="post">
        <input name="email" placeholder="email"/>
        ${getError(errors,'email')}
        <input name="password" placeholder="password"/>
        ${getError(errors,'password')}
        <button>Login</button>
    </form>
    </div>
    `
    });
}
