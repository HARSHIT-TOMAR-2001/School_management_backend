require('dotenv').config();
process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');
const teacherRouter = require('../../../router/teacher.router');
const conn = require('../../../database/connect');

describe('POST /teacher', function () {
  before((done) => {
    conn
      .connectDB()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    conn
      .close()
      .then(() => done())
      .catch((err) => done(err));
  });
  it('OK, register new Teacher', (done) => {
    request(teacherRouter)
      .post('/signup')
      .send({
        name: 'Prateek Dubey',
        email: 'prateek@gmail.com',
        password: 'prateek@123',
        subjects: ['physics', 'chemistry', 'math'],
        grade_level: 'Elementary',
      })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('success');
        expect(body).to.contain.property('msg');
        done();
      })
      .catch((err) => done(err));
  });
});
