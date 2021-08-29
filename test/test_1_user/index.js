const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');

// assertion style 
chai.should()
chai.use(chaiHttp);

const user ={
    "first_name":"demo",
    "last_name":"user",
    "email":"demouser@test.com",
    "phone_number":"8957894568"
}

describe('POST /api/user',()=>{

    describe('ADD USER',()=>{

        // TEST 1
        it('should add new user',(done)=>{
            
            chai.request(server)
            .post('/api/user/create-user')
            .send(user)
            .end((err,result)=>{
                result.should.have.status(201)
                result.body.should.be.a('object')
                result.body.should.have.property('error').eq(false)
                result.body.should.have.property('message').eq('USER_CREATED')
                done()
            })
        })
        // TEST 2
        it('should NOT add new user',(done)=>{
            chai.request(server)
            .post('/api/user/create-user')
            .send(user)
            .end((err,result)=>{
                result.should.have.status(409)
                result.body.should.be.a('object')
                result.body.should.have.property('error').eq(true)
                done()
            })
        })

        // TEST 3
        it('should list an user',(done)=>{
            chai.request(server)
            .post('/api/user/list-user')
            .send({email:user.email})
            .end((err,result)=>{
                result.should.have.status(200)
                result.body.should.be.a('object')
                result.body.should.have.property('error').eq(false)
                result.body.should.have.property('message').eq('USER_DETAILS')
                done()
            })
        })

        // TEST 4
        it('should NOT list an user',(done)=>{
            chai.request(server)
            .post('/api/user/list-user')
            .send({email:'wrongemail@test.com'})
            .end((err,result)=>{
                result.should.have.status(404)
                result.body.should.be.a('object')
                result.body.should.have.property('error').eq(true)
                done()
            })
        })

    }) // end of test 
})


