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
module.exports = ({req,errors})=>{
    return layout({
        content: `
     <div>
    Your Id is:  ${req.session.userId}
      <form method="post">
      <input name="email" placeholder="email">
      ${getError(errors,'email')}
      <input name="password" placeholder="password">
      ${getError(errors,'password')}
      <input name="confirmPassword" placeholder="password confirm">
      ${getError(errors,'confirmPassword')}
      <button>Sing Up</button>
      </form>
     </div>
    `});
}
