"use strict";
const app = require("../../app");
const request = require("supertest");
const seedFile = require("./seeds/basic.seed");
const MongoUtils = require("../../bin/mongo-utils");
const MongoClient = require('mongodb').MongoClient;

describe('/product', function () {

    beforeAll(() => MongoClient.connect('mongodb://localhost/nodeCart_test')
        .then((db) => new MongoUtils(db))
        .then((mc) => mc.seedDb(seedFile))
    );

    describe('GET /product', function () {

        test('should get all products from db', function () {
            return request(app)
                .get('/product/')
                .expect(200)
                .then((res) => {
                    expect(res.body).toHaveLength(5);

                })
        });
    });

    describe('POST /product', function () {

        describe('POST /product Validation OK', function () {

            test('should create product when data is validable', function () {
                return request(app)
                    .post('/product/')
                    .send({ name: "testProduct", description: "This is description of test product", price: 100, cat_key: 97388 })
                    .expect(200)
                    .then((res) => {
                        expect(res.body).toHaveProperty('_id');

                    })
            });
        });

        describe('POST /product Validation Error handling', function () {

            test('should respond with Error 422 when no category provided', function () {
                return request(app)
                    .post('/product/')
                    .send({ name: "testProduct", description: "This is description of test product", price: 100 })
                    .expect(422)
                    .then((res) => {
                        expect(res).not.toBe(null);
                        expect(res.error.text).toBe("ValidationError : Product validation failed: cat_key: Please put this product in specific category");
                    })

            });

            test('should respond with Error 422 when no product name provided', function () {
                return request(app)
                    .post('/product/')
                    .send({ description: "This is description of test product", price: 100, cat_key: 97388 })
                    .expect(422)
                    .then((res) => {
                        expect(res).not.toBe(null);
                        expect(res.error.text).toBe("ValidationError : Product validation failed: name: Please insert product name");
                    })

            });

            test('should respond with Error 422 when no description provided', function () {
                return request(app)
                    .post('/product/')
                    .send({ name: "testProduct", price: 100, cat_key: 97388 })
                    .expect(422)
                    .then((res) => {
                        expect(res).not.toBe(null);
                        expect(res.error.text).toBe("ValidationError : Product validation failed: description: Please insert product description");
                    })
            });

            test('should respond with Error 422 when no price provided', function () {
                return request(app)
                    .post('/product/')
                    .send({ description: "This is description of test product", name: "testProduct", cat_key: 97388 })
                    .expect(422)
                    .then((res) => {
                        expect(res).not.toBe(null);
                        expect(res.error.text).toBe("ValidationError : Product validation failed: price: Please insert product base price");
                    })
            });

        });
    });

})
