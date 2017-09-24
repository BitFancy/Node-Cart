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
        test('should create a category', function () {
            return request(app)
                .get('/categories/')
                .send({})
                .expect(200)
                .then((res) => {
                    expect(res.body).toHaveLength(12);

                })
        });
    });

})
