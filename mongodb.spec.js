/* eslint-disable no-undef */
const mongoose = require('mongoose');
const dbConfig = require('./mongodbConfig');

mongoose.Promise = global.Promise;

describe('mongodb', () => {
    afterAll(() => mongoose.connection.close());

    it('should mongodb is runing', (done) => {
        mongoose.connect(dbConfig, { useMongoClient: true }, (err) => {
            try {
                expect(err).toBe(undefined || null);
                done();
            } catch (error) {
                done(error);
            }
        });
    });
});
