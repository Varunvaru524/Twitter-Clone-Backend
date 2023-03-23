const request = require('supertest')
const Jwt = require('jsonwebtoken')
const config = require('config')
const UserModel = require('../Models/Users')
let server;


describe('Login Api',()=>{
    beforeEach(async ()=>{
        server = require('../index')
        await new UserModel({
            firstName: "testFirstName",
            lastName:"testLastName",
            userName:'testUserName',
            email:"testEmail@twitter-clone.com",
            password: 'testPassword',
            confirmPassword:'testPassword'
        }).save()
    })
    afterEach(async ()=>{
        await server.close()
        await UserModel.deleteMany({})
    })

    it('Should return a valid jwt token if the user exists',async ()=>{
        const result = await request(server).post('/api/login').send({email:'testEmail@twitter-clone.com',password:'testPassword'})
        expect(result.status).toBe(200)
        expect(Jwt.verify(result.text,config.get('jwt')).email).toBe('testEmail@twitter-clone.com')
    })
    it('Should return invalid Username or password if the user does not exist',async ()=>{
        const result = await request(server).post('/api/login').send({email:'testEmail@twitter-clone.com',password:'testPasswor'})
        expect(result.status).toBe(404)
        expect(result.text).toBe('Invalid Email or Password')
    })
})