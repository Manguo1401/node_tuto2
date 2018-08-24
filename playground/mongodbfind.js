// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

  /*   db.collection('Todos').insertOne({
        text: 'something to do',
        completed: false
    }, (err, result) => {
        if(err) {
            console.log('Unable to insert todo', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    }); */

   /*  db.collection('Todos').find({
            _id: new ObjectID('5b7fd62ef7ddca13603fdf6c')
        }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    }); */

   /*  db.collection('Todos').find().count().then((count) => {
        console.log('Todos number');
        console.log(JSON.stringify(count, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    }); */

    db.collection('Users').find({
        name: 'Aaron'
    }).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
        console.log(err);
    })


    // db.close();
});