/* eslint-disable no-console */
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27019/hello-mongodb', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
// });

mongoose.connect('mongodb://localhost:27019/hello-mongodb', {
    useMongoClient: true,
});

mongoose.Promise = global.Promise;

const { connection, Schema } = mongoose;

// connection.close().then(() => {
//     connection.db.dropDatabase().catch((err) => {
//         console.log('ksjdnfks');
//     });
// }).catch((err) => {
//     console.log('ERROR', err);
// });


const userSchema = new Schema({
    email: {
        type: String, default: '', lowercase: true, trim: true, index: true,
    },
    firstName: {
        type: String, default: '', trim: true, index: true,
    },
    lastName: {
        type: String, default: '', trim: true, index: true,
    },
});

const bookSchema = new Schema({
    name: {
        type: String, default: '', lowercase: true, trim: true, index: true,
    },
    uuid: {
        type: String, default: '', lowercase: true, trim: true, index: true,
    },
});

connection.model('User', userSchema);
connection.model('Book', bookSchema);



const User = connection.model('User');
const user1 = new User({ email: 'user1@mail.com', firstName: 'User1', lastName: 'User1' });
// const user2 = new User({ email: 'user2@mail.com', firstName: 'User2', lastName: 'User2' });

mongoose.connection.on('disconnected', () => { console.log('-> lost connection'); });
mongoose.connection.on('reconnect', () => { console.log('-> reconnected'); });
mongoose.connection.on('connected', () => { console.log('-> connected'); });
mongoose.connection.on('reconnectFailed', () => { console.log('-> gave up reconnecting'); });

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('connected', () => {
    // Promise.all([
    user1.save()
        .then(() => {
            console.log('Inserto');
            connection.dropDatabase().then((v) => {
                console.log('Database deleted');
                connection.close().then(() => {
                    console.log('Connection closed');
                }).catch(() => {
                    console.log('Error closed connection');
                });
            }).catch((err) => {
                console.log('Error deleting');
            });
        }).catch(() => {
            console.log('Error');
        });
});

connection.on('close', () => {
    console.log('When close connection');
});

connection.on('disconnected', () => {
    console.log('When disconected');
});
