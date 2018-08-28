const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.generateAuthToken = function () {
    let user = this;

    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, "abc123").toString();

    user.tokens = user.tokens.concat([{
        access,
        token
    }]);

    return user.save().then(() => {
        return token;
    });
};

UserSchema.statics.findByToken = function(token) {
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, "abc123");
    } catch (err) {
        /* return new Promise((resolve, reject) => {
            reject();
        }); */ //Same thing as under
        return Promise.reject(/* 'err argument value here' */);
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.pre('save', function (next) {
    let user = this;

    if (user.isModified('password')) { //Takes an individual property and checks if it's modified
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.methods.toJSON = function () {
    let user = this;

    let userObject = user.toObject(); // Mongoose property that transforms the user variable with only the properties that on the document

    return _.pick(userObject, ['_id', 'email']);
};

let User = mongoose.model('User', UserSchema);

module.exports = {User};