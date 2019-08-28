const localStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = (passport) => {

    passport.serializeUser((user, done) => {
        console.log("Info - Passport : SerializeUser Execute")
        done(null, user)
    })

    passport.deserializeUser((user, done) => {
        console.log("Info - Passport : DeserializeUser Execute")
        done(null, user)
    })

    passport.use('local-login', new localStrategy({
        usernameField : 'email',
        passwordField : 'password',
        session : true,
        passReqToCallback : true,
    }, (req, email, password, done) => {
        console.log("Info - Passport : Local Login Strategy Execute")

        if(!req.user){
            User.findOne({'email' : email})
            .then((user) => {
                if(!user){
                    return done(null, false, req.flash('signMsg', 'Not Found User'))
                }
                if(user.comparePassword(password)){
                    return done(null, user, req.flash('singMsg', "Logged In Success"))
                }else{
                    return done(null, false, req.flash('signMsg', 'Logged In Failed....'))
                }
            })
            .catch((error) => {
                return done(error)
            })
        }else{
            return done(null, false, req.flash('signMsg', "Impossible Local Login"))
        }
    }))


    passport.use('local-register', new localStrategy({
        usernameField : 'email',
        passwordField : 'password',
        session : true,
        passReqToCallback : true,
    }, (req, email, password, done) => {
        if(!req.user){
            User.findOne({'email' : email})
            .then((user) => {
                if(user){
                    return done(null, false, req.flash("signMsg", "Don't use Email"))
                }

                User.create(req.body.username, email, password)
                .then((user) => {
                    console.log("Info - Mongoose : new User Save :", user)
                    return done(null, user, req.flash("signMsg", "Success Register"))
                })
                .catch((saveError) => {
                    return done(saveError)
                })
            })
        }else{
            return done(null, false, req.flash("signMsg", "Impossible Local Register"))
        }
    }))    
}