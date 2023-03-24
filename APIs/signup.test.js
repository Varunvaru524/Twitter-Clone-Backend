const mongoose = require('mongoose')
const request = require('supertest')
const Jwt = require('jsonwebtoken')
const config = require('config')
const UserModel = require('../Models/Users')
let server;


describe('Signup Api',()=>{
    beforeEach(async ()=>{
        await mongoose.connect(config.get('db'))
        server = require('../index')
    })
    afterEach(async ()=>{
        await UserModel.deleteMany({})
        await mongoose.disconnect()
        await server.close()
    })

    it('Should return a valid jwt token tn Successfull registration',async ()=>{
        const result = await request(server).post('/api/signup').send({
            firstName: "testFirstName",
            lastName:"testLastName",
            userName:'testUserName',
            email:"testEmail@twitter-clone.com",
            password: 'testPassword',
            confirmPassword:'testPassword'
        })
        expect(result.status).toBe(200)
        expect(Jwt.verify(result.text,config.get('jwt')).email).toBe('testEmail@twitter-clone.com')
    })
    it('Should return User already registered',async ()=>{
        await new UserModel({
            firstName: "testFirstName",
            lastName:"testLastName",
            userName:'testUserName',
            email:"testEmail@twitter-clone.com",
            password: 'testPassword',
            confirmPassword:'testPassword'
        }).save()

        const result = await request(server).post('/api/signup').send({
            firstName: "testFirstName",
            lastName:"testLastName",
            userName:'testUserName',
            email:"testEmail@twitter-clone.com",
            password: 'testPassword',
            confirmPassword:'testPassword'
        })
        expect(result.status).toBe(400)
        expect(result.text).toBe('User already registered')
    })
})