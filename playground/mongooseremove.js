const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
/* 
Todo.remove({}).then((result) => {
    console.log(remove);
}); */

/* Todo.findOneAndRemove */
// Todo.findByIdAndRemove

Todo.findByIdAndRemove('5b82d14c0bf59a1df8500245').then((todo) => {
    console.log(todo);
});