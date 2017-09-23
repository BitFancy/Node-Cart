"use strict";
const app = require("../../app");
const should = require('should');
const request = require("supertest");
const seedFile = require("./seeds/basic.seed");
const MongoUtils = require("../../bin/mongo-utils");
const MongoClient = require('mongodb').MongoClient;

describe('/product', function () {


    describe('GET /product', function () {
        beforeAll(() => MongoClient.connect('mongodb://localhost/nodeCart_test')
            .then((db) => new MongoUtils(db))
            .then((mc) => mc.seedDb(seedFile))
        );

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

        test('should create product when data is validable', function (done) {
            request(app)
                .post('/product/')
                .send({ name: "testProduct", description: "This is description of test product", price: 100, cat_key: 97388 })
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    }
                    else
                        res.body.should.have.ownProperty('_id');
                    done();

                })
        });

        test('should throw Error 422 when no category provided', function () {
            return request(app)
                .post('/product/')
                .send({ name: "testProduct", description: "This is description of test product", price: 100 })
                .then((res) => {
                    expect(res).not.toBe(null);
                    expect(res.status).toBe(422);
                })
            });
    });


})







