const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

/* let id = '5b82608b28fe6e2584172bbd11';

if (!ObjectID.isValid(id)) {
    console.log('Something is wrong with your ID. It\'s not valid');
}
 */
/* Todo.find({
    _id: id 
}).then((todos) => {
    console.log('Todos: ', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo: ', todo);
}); */
/* 
Todo.findById(id).then((todo) => {
    if(!todo) {
        return console.log('Id not found');
    }
    console.log('Todo by id :', todo);
}).catch((e) => {
    console.log(e);
}); */

let id = '5b8030f2182af012cc2c4cde';

User.findById(id).then((user) => {
    if(!user) {
        return console.log('User not found.');
    }
    console.log('User by id: ', user);
}).catch((e) => {
    console.log('Something wrong with your query. User ID not found', user);
})