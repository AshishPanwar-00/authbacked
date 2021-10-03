const express = require('express');
require('./db/conn')
const authRoutes = require('./routes/authRoutes');
const mainRoutes = require("./routes/mainRoutes")
const uploadRoutes = require("./admin/upload/upload")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use(authRoutes)
app.use(mainRoutes);
app.use(uploadRoutes)


app.set('view engine', "ejs");
app.get('/', (req, res) => {
    res.render('index');
})




app.listen(8000, () => console.log("listening to port 8000"))