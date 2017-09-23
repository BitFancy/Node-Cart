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
    
        test.only('should get all products from db', function (done) {
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
    
    
    })



    
});


