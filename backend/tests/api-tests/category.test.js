"use strict";
const app = require("../../app");
const request = require("supertest");
const seedFile = require("./seeds/basic.seed");
const MongoUtils = require("../../scripts/mongo-utils");
const MongoClient = require('mongodb').MongoClient;

describe('/category', function () {

    beforeAll(() => MongoClient.connect('mongodb://localhost/nodeCart_test')
        .then((db) => new MongoUtils(db))
        .then((mc) => mc.seedDb(seedFile))
    );

    describe('GET /categories', function () {

        test('should get all categories from db', function () {
            return request(app)
                .get('/categories/')
                .expect(200)
                .then((res) => {
                    expect(res.body).toHaveLength(12);

                })
        });

    });

    describe('POST /category', function () {
        test('should create a category in root level', function () {
            return request(app)
                .post('/category/')
                .send({ name: "test category", path: "null" })
                .expect(200)
                .then((res) => {
                    expect(res.body).toHaveProperty("_id");
                })
        });

        test('should respond with Error 422 when no category name provided', function () {
            return request(app)
                .post('/category/')
                .send({ path: "null" })
                .expect(422)
                .then((res) => {
                    expect(res.error.text).toContain('ValidationError : Category validation failed: name: Please insert category name');
                })
        });

        test('should respond with Error 422 when no category path', function () {
            return request(app)
                .post('/category/')
                .send({ name: 'Test category 1' })
                .expect(422)
                .then((res) => {
                    expect(res.error.text).toContain('ValidationError : Category validation failed: path: Please insert category path');
                })
        });

        test('should not take into account key parameter', function () {
            let someKey = "A34DDW";
            return request(app)
                .post('/category/')
                .send({ name: 'Test category 1', path: "null", key: someKey })
                .expect(200)
                .then((res) => {
                    expect(res.body.key).not.toBe(someKey);
                })
        });
    });

    describe('GET /category/:key/', function () {
        
                test('should get all subcategories when queried category is not end category', function () {
                    return request(app)
                        .get('/category/59867')
                        .expect(200)
                        .then((res) => {
                            expect(res.body).toHaveLength(3);
        
                        })
                });
        
                test('should get all products when queried category is end category', function () {
                    let cat_key = 35950;
                    return request(app)

                        .get('/category/' + cat_key)
                        .expect(200)
                        .then((res) => {
                            expect(res.body).toHaveLength(2);
                            expect(res.body[0]).toHaveProperty('price');
                            expect(res.body[0]).toHaveProperty('cat_key');
                            expect(res.body[0]["cat_key"]).toBe(cat_key);

                            expect(res.body[1]).toHaveProperty('price');
                            expect(res.body[1]).toHaveProperty('cat_key');
                            expect(res.body[1]["cat_key"]).toBe(cat_key);
                        })
                });

                test.skip('should return 404 when categorz does not exit', function () {
                   return request(app)
                        .get('/category/111333666')
                        .expect(404)
                        
                });

                test.skip('should get all products when queried category is end category', function () {
                    let cat_key = 59864;
                    return request(app)
                        .get('/category/' + cat_key)
                        .expect(200)
                        .then((res) => {
                            expect(res.body).toHaveLength(13);
                            
                        })
                        
                });
        
            });
        
            

})
