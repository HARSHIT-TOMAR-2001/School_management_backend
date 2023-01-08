// require('dotenv').config();
// const expect = require('chai').expect;
// const config = process.env;
// const request = require('request');
// const Testing_Url =config.Testing_Url

// describe('Register Student Api',()=>{
//     describe('No email provided validation error',()=>{
//         it('Status',done=>{
//             Response.post(`${Testing_Url}/api/student/signup`, {},(_,response)=>{
//                 console.log(response.statusCode)  
//             })
//         })
//     })
//     describe('Create user invalid email field', () => {
//         const payload = {
//           firstName: "firstname",
//           lastName: "Doe",
//           email: "johndoe",
//           password: "johndoe",
//           employeeNo: "213"
//         }
  
//         it('Status', done => {
//           request.post(`${Testing_Url}/api/student/signup`, {
//             json: payload
//           }, (_, response) => {
//             expect(response.statusCode).to.equal(400)
//             done()
//           })
//         })
  
//         it('Message', done => {
//           request.post(`${Testing_Url}/api/student/signup`, {
//             json: payload
//           }, (_, response) => {
//             expect(response.body.errors.email[0]).to.equal('Email is invalid')
//             done()
//           })
//         })
//       })
// })
