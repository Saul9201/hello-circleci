/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27019/hello-mongodb', {
    useMongoClient: true,
});

mongoose.Promise = global.Promise;

const { connection, Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String, default: '', trim: true, index: true,
    },
    lastName: {
        type: String, default: '', trim: true, index: true,
    },
});

connection.model('User', userSchema);

const User = connection.model('User');
const user1 = new User({ email: 'user1@mail.com', firstName: 'User1', lastName: 'User1' });

connection.on('error', console.error.bind(console, '-> connection error:'));
connection.on('disconnected', () => { console.log('-> lost connection'); });
connection.on('reconnect', () => { console.log('-> reconnected'); });
connection.on('connected', () => { console.log('-> connected'); });
connection.on('reconnectFailed', () => { console.log('-> gave up reconnecting'); });
connection.on('close', () => { console.log('-> when close connection'); });
connection.once('connected', () => {
    user1.save()
        .then(() => {
            console.log('Insert');

            connection.dropDatabase().then(() => {
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

