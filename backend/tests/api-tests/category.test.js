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

    describe.only('POST /category', function () {
        test.only('should create a category in root level', function () {
            return request(app)
                .post('/category/')
                .send({name: "test category", path: "null" })
                .expect(200)
                .then((res) => {
                    console.log(res.error.text)
                })
        });
    });

})
