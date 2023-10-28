// const mongodb = require('mongodb');
// const mongoClient = mongodb.MongoClient;

// let _db;

// const mongoConnect = callback => {
//     mongoClient.connect('mongodb+srv://DaniZeu:NtOPCucGQN8u3Epy@cluster0.w4cjk7i.mongodb.net/learnVocab?retryWrites=true&w=majority')
//     .then(client => {
//         console.log('Connected!')
//         _db = client.db();
//         callback();
//     })
//     .catch(err => console.log(err))
// }

// const getDb = () => {
//     if(_db) {
//         return _db;
//     }

//     throw 'No database found!';
// }

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;