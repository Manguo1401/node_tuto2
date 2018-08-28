const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');


const user1id = new ObjectID();
const user2id = new ObjectID();

const users = [{
    _id: user1id,
    email: 'flop@test.fr',
    password: 'password1',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: user1id, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: user2id,
    email: 'flop2@test.fr',
    password: 'password2',
}]

const todos = [{
    _id: new ObjectID(),
    text: 'first test todo'
}, {
    _id: new ObjectID(),
    text: 'second test todo',
    completed: true,
    completedAt: 33333
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        // This tweak lets the users be saved and launch the pre save method in the User model to fire and hash the password
        // else it would just save the plain password in the db with insertMany
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);

    }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};