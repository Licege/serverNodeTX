const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const Admin = mongoose.model('admin')
const keys = require('../config/keys')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use('admin-jwt',
        new JwtStrategy(options, async (payload, done) => {
            try {
                const admin = await Admin.findOne({user_id: payload.userId}).select('_id')

                if (admin) {
                    done(null, admin)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        })
    )
}