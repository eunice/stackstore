'use strict';
var path = require('path');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var facebookConfig = app.getValue('env').FACEBOOK;

    var facebookCredentials = {
        clientID: facebookConfig.clientID,
        clientSecret: facebookConfig.clientSecret,
        callbackURL: facebookConfig.callbackURL,
        scope: ['email']
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
      console.log('facebook', profile);

        UserModel.findOne({ 'facebook.id': profile.id }, function (err, user) {

            if (err) return done(err);

            if (user) {
                console.log(user);
                done(null, user);
            } else {
                UserModel.create({
                    facebook: {
                        id: profile.id
                    },
                    displayName: profile.displayName,
                    userType: "User",
                    email: profile._json.email
                }).then(function (user) {
                    done(null, user);
                }, function (err) {
                    console.error('Error creating user from Facebook authentication', err);
                    done(err);
                });
            }

        });

    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/');
        });

};
