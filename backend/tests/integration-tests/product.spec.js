"use strict";
const app = require("../../app");
const chai = require('chai');
const expect = chai.expect;
const request = require("supertest");


describe('/product', function () {


    before(function () {
        //should take port no. as parameter not to ask for occupied 3000 port main app is running
    });

    after(function () {
        //kill server here
    });

    it('should get products when they exist in db', function (done) {
        request(app)
            .get('/product')
            .expect(200)
            .end(function(err, res){
                expect(res.body).to.be.an('array');
                done();
            })
    });

});