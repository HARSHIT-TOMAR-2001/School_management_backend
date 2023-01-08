require('dotenv').config();
const expect = require('chai').expect;
const config = process.env;
const request = require('request');
const Testing_Url =config.Testing_Url

describe('Teacher API', () => {
    describe('Register Teacher', () => {
      describe('Register teacher validation ERROR', () => {
        describe('Create user invalid email field', () => {
            const payload = {
                name: "Prashant",
                email: "",
                password: "johndoe",
                subjects:["physics","chemistry","math"],
                grade_level:"Elementary"
              }
    
          it('Status', done => {
            request.post(`${Testing_Url}/api/teacher/register`, {
              json: payload
            }, (_, response) => {
              expect(response.status).to.equal(400)
              done()
            })
          })
    
          it('Message', done => {
            request.post(`${Testing_Url}/api/teacher/register`, {
              json: payload
            }, (_, response) => {
              expect(response.body.errors.email[0]).to.equal('Email is invalid')
              done()
            })
          })
        })
      })
    })
  })