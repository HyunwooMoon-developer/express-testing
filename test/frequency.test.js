/* eslint-disable no-undef */
const app = require('../app');
const expect = require('chai').expect;
const supertest = require('supertest');

describe('GET /frequency endpoint', () => {
    it('should return count', () => {
        const expected = {
            count: 2,
            average: 5,
            highest: 'a',
            'a': 6,
            'b': 4 
          };
    return supertest(app)
    .get('/frequency')
    .query({s: 'aaBBAAbbaa'})
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {   
      expect(res.body).to.include.all.keys('count', 'average', 'highest');
      expect(res.body).eql(expected);
    });
})
})