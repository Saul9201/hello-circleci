/* eslint-disable no-undef */
const redisClient = require('./redisClient');

describe('redis', () => {
    afterAll(() => redisClient.end(true));

    it('should redis is runing', (done) => {
        redisClient.set('key', 'value', (err, rp) => {
            try {
                expect(err).toBe(null);
                expect(rp).toBe('OK');
                done();
            } catch (error) {
                done(error);
            }
        });
    });
});
