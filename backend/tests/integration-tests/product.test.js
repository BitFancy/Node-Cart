"use strict";
const app = require("../../app");
const should = require('should');
const request = require("supertest");
const seedFile = require("./seeds/products.seed");
const mongoUtils = require("../../bin/mongo-utils");

describe('/product', function () {


    describe('GET /product', function () {

        beforeAll(() => {
           mongoUtils.seedDb(seedFile);
        });



        test('should get all products from db', function (done) {
            request(app)
                .get('/product/')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).toHaveLength(2);
                    if (err) {
                        done(err);
                    }
                    else
                        done();

                })
        });

    });


});


