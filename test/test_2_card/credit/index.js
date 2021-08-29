const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../index');

// assertion style 
chai.should()
chai.use(chaiHttp);

const credit_card ={
    "amount": "100.80",
    "currency":"USD",
    "type": "creditcard",
    "card": {
        "number": "5111111111111111",
        "expirationMonth": "10",
        "expirationYear": "2030",
        "cvv": "211"
    }
}


describe('POST /api/purchase/item',()=>{

    describe('CREDIT CARD PAYMENT',()=>{

        // TEST 1
        it('add a new order',(done)=>{
            chai.request(server)
            .put('/api/purchase/item')
            .send(credit_card)
            .end((err,result)=>{
                result.should.have.status(200)
                result.body.should.be.a('object')
                result.body.should.have.property('status').eq("success")
                done()
            })
        })


        // TEST 2
        it('no new order for wrong cvv',(done)=>{
            const card_details = credit_card;
            card_details.card.cvv = 210;
            chai.request(server)
            .put('/api/purchase/item')
            
            .send(card_details)
            .end((err,result)=>{
                result.should.have.status(422)
                result.body.should.be.a('object')
                result.body.should.have.property('status').eq("fail")
                done()
            })
        })

        // TEST 2
        it('no new order for wrong expiration month',(done)=>{
            const card_details = credit_card;
            card_details.card.expirationMonth = 1;
            chai.request(server)
            .put('/api/purchase/item')
            .send(card_details)
            .end((err,result)=>{
                result.should.have.status(422)
                result.body.should.be.a('object')
                result.body.should.have.property('status').eq("fail")
                done()
            })
        })

        // TEST 3
        it('no new order for wrong expiration year',(done)=>{
            const card_details = credit_card;
            card_details.card.expirationYear = 2018;
            chai.request(server)
            .put('/api/purchase/item')
            .send(card_details)
            .end((err,result)=>{
                result.should.have.status(422)
                result.body.should.be.a('object')
                result.body.should.have.property('status').eq("fail")
                done()
            })
        })

        // TEST 4
        it('no new order for wrong currency type',(done)=>{
            const card_details = credit_card;
            card_details.card.currency = "INR";
            chai.request(server)
            .put('/api/purchase/item')
            .send(card_details)
            .end((err,result)=>{
                result.should.have.status(422)
                result.body.should.be.a('object')
                result.body.should.have.property('status').eq("fail")
                done()
            })
        })

        // TEST 5
        it('no new order for negative amount',(done)=>{
            const card_details = credit_card;
            card_details.card.amount = "-100";
            chai.request(server)
            .put('/api/purchase/item')
            .send(card_details)
            .end((err,result)=>{
                result.should.have.status(422)
                result.body.should.be.a('object')
                result.body.should.have.property('status').eq("fail")
                done()
            })
        })
      
    })
})