const express = require('express');
const bodyParser =require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
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
    console.log(req.body)
    res.send('Account created successfully');
}))
app.listen(8080,()=>{
    console.log("listening");
})

console.log("Hi there");
