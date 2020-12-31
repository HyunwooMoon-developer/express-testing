/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const {expect} = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('express app', () => {
    it('should return a message from GET /', ()=>{
        return supertest(app)
                .get('/')
                .expect(200, 'hello express!');
    })
})

describe('GET /quotient', ()=>{
    it(`8/4 should be 2`, ()=> {
        return supertest(app)
                .get('/quotient')
                .query({a:8, b:4})
                .expect(200, '8 divided by 4 is 2')
    })
    it(`should return 400 if 'a' is missing`, ()=>{
        return supertest(app)
                .get('/quotient')
                .query({b:4})
                .expect(400, 'value for a is need');
    })
})

describe('GET /generate endpoint', () => {
    it('should generate an array of 5', () => {
      return supertest(app)
        .get('/generate') // invoke the endpoint
        .query({ n: 5 }) // send the query string ?n=5
        .expect(200)  // assert that you get a 200  OK status
        .expect('Content-Type', /json/)
        .then(res => {
          // make sure you get an array
          expect(res.body).to.be.an('array');
          // array must not be empty
          expect(res.body).to.have.lengthOf.at.least(1);
          
        //expect(res.body).to.include(5);
        //expect(res.body).to.include.members([1,2,3,4,5]);
        expect(res.body).to.be.an('array').that.have.members([1,2,3,4,5]);    
        });
    })
  });