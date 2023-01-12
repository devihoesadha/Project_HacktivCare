const express = require('express');
const app = express();
const PORT = 3000

const route = require('./routes/index');

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : false}))

app.use('/', route)


app.listen(PORT, () => {
    console.log(`Running at localhost:3000`)
})
