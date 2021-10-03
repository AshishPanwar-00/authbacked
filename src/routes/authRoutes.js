const express = require('express')
const { User } = require('../db/schema');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('../auth/passportSetup')

const router = express.Router();

router.use(session({

    secret: "somesecretKey",
    saveUninitialized: true,
    resave: false,

    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/authentication", collectionName: "session" }),
    cookie: {

        maxAge: 24 * 3600 * 1000
    }
}))


router.use(passport.initialize())
router.use(passport.session())



// google login 
router.get('/user/login/google', passport.authenticate('google', {
    scope: ["email", "profile"],
}));
router.get('/api/v1/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/pro',
        failureRedirect: '/'
    }));

//local login
router.post("/users/login", passport.authenticate('local'), (req, res) => {
    if (req.isAuthenticated()) {
        res.send('you are authenticated')
    }
    else {
        res.send('failed')
    }
})

router.post("/users/register", async (req, res) => {

    const { username, password, email } = req.body;
    const matchedUser = await User.findOne({ username });
    if (matchedUser) {
        res.json("you are already registered please login")
    }
    else {
        const newUser = await User({ username, password, email });
        newUser.save();
        // console.log(newUser);

        res.send("user saves successfully")
    }





});

router.get('/logout', (req, res) => {
    req.logout();
    res.send('you are successfuly logges out')
})


module.exports = router
