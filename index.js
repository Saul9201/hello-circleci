/* eslint-disable no-console */
const mongoose = require('mongoose');
const dbConfig = require('./mongodbConfig');

mongoose.connect(dbConfig, { useMongoClient: true, autoIndex: false });

mongoose.Promise = global.Promise;
const { connection, Schema } = mongoose;
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

connection.model('User', userSchema);
const User = connection.model('User');
const user1 = new User({ email: 'user1@mail.com', firstName: 'User1', lastName: 'User1' });

connection.once('connected', () => {
    user1.save((err, us) => {
        if (err) return console.log('Error');

        console.log('Insert User');
        console.log(us);

        return connection.dropDatabase(() => {
            connection.close();
        });
    });
});

// Connection Examples
// connection.on('error', console.error.bind(console, '-> connection error:'));
// connection.on('disconnected', () => { console.log('-> lost connection'); });
// connection.on('reconnect', () => { console.log('-> reconnected'); });
// connection.on('connected', () => { console.log('-> connected'); });
// connection.on('reconnectFailed', () => { console.log('-> gave up reconnecting'); });
// connection.on('close', () => { console.log('-> when close connection'); });
