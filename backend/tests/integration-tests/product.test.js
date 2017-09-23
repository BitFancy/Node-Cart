"use strict";
const app = require("../../app");
const should = require('should');
const request = require("supertest");
const seedFile = require("./seeds/basic.seed");
const MongoUtils = require("../../bin/mongo-utils");

describe('/product', function () {


    describe('GET /product', function () {
        beforeAll(() => MongoUtils.seedDb(seedFile));



        test.only('should get all products from db', function (done) {
            request(app)
                .get('/product/')
                .expect(200)
                .end(function (err, res) {
                    console.log("RES: ", res)
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


