const express = require('express');
const session = require('express-session')
const app = express();
const PORT = 3000

const route = require('./routes/index');

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //     secure: false,
    //     sameSite: false
    // }
}))

app.use('/', route)


app.listen(PORT, () => {
    console.log(`Running at localhost:3000`)
})
