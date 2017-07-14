"use strict";
const app = require("../../app");
const should = require('should');
const request = require("supertest");

describe('/product', function () {


    describe('GET /product', function () {

        beforeAll(() => {
           return mongoUtils.clearDb()
               .then.mongoUtils.seedDb(seedFile);
        });



        test('should get all products from db', function (done) {
            request(app)
                .get('/product/')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).toHaveLength(5);
                    if (err) {
                        done(err);
                    }
                    else
                        done();

                })
        });

    });


});


