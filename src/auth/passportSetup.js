const passport = require('passport');
const lStrategy = require('passport-local');
const gStrategy = require('passport-google-oauth2')
const { User } = require('../db/schema');
require('dotenv').config()



// for local login 
const localStrategy = new lStrategy(async (username, password, done) => {
    try {
        if (username && password) {
            const matchedUser = await User.findOne({ username });
            console.log(matchedUser);
            if (!matchedUser) {
                done(null, false)
            } else {


                if (matchedUser.password) {
                    if (matchedUser.password !== password) {
                        done(null, false)
                    } else {
                        done(null, matchedUser)
                    }

                }
                else {
                    done(null, false)
                }
            }

        }
        else {
            done(null, false, { message: "please provid evalid username and password" })
        }

    } catch (error) {
        done(error)

    }


});
passport.use(localStrategy);


// fro google login 
const GoogleStrategy = new gStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
}, async function (request, accessToken, refreshToken, profile, done) {
    try {

        const matchedUser = await User.findOne({ email: profile.email });
        if (matchedUser) {
            const modfiedUser = await User.findByIdAndUpdate({ _id: matchedUser._id }, { "googleId": profile.id, "provider": profile.provider })
            modfiedUser.save();

            done(null, modfiedUser);
        }
        else {
            const newUser = await User({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.email,
                provider: profile.provider
            })
            newUser.save();

            done(null, newUser)
        }
    } catch (error) {
        done(error)

    }

});
passport.use(GoogleStrategy);




passport.serializeUser((user, cb) => {

    cb(null, user.id);
});
passport.deserializeUser(async (id, cb) => {
    const user = await User.findOne({ id }).catch((err) => {
        console.log("error desirilizing");
        cb(err, null)
    })
    if (user) {
        cb(null, user)
    }

})

