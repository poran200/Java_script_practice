const express = require('express');

const app = express();
app.get('/', (req, res) => {
    res.send(`
     <div>
      <form method="post">
      <input name="email" placeholder="email">
      <input name="password" placeholder="password">
      <input name="confirmPassword" placeholder="password confirm">
      <button>Sing Up</button>
      </form>
     </div>
    `)
});

app.post('/',((req, res) => {
    console.log(req.formData)
    res.send('Account created successfully');
}))
app.listen(8080,()=>{
    console.log("listening");
})

console.log("Hi there");
