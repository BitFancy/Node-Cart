"use strict";
const app = require("../../app");
const request = require("supertest");
const seedFile = require("./seeds/basic.seed");
const MongoUtils = require("../../bin/mongo-utils");
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
                .send({name: "test category", path: "null" })
                .expect(200)
                .then((res) => {
                    expect(res.body).toHaveProperty("_id");
                })
        });
    });

    describe('POST /category', function () {
        test('should respond with Error 422 when no category name provided', function () {
            return request(app)
                .post('/category/')
                .send({path: "null" })
                .expect(422)
                .then((res) => {
                    expect(res.error.text).toContain('ValidationError : Category validation failed: name: Please insert category name');
                })
        });
    });
    
    describe('POST /category', function () {
        test('should respond with Error 422 when no category path', function () {
            return request(app)
                .post('/category/')
                .send({name : 'Test category 1' })
                .expect(422)
                .then((res) => {
                    expect(res.error.text).toContain('ValidationError : Category validation failed: path: Please insert category path');
                })
        });
    });

    describe('POST /category', function () {
        test('should not take into account key parameter', function () {
            let someKey = "A34DDW";
            return request(app)
                .post('/category/')
                .send({name : 'Test category 1', path : "null", key : someKey})
                .expect(200)
                .then((res) => {
                    expect(res.body.key).not.toBe(someKey);
                })
        });
    });

})
