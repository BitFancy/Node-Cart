"use strict";

const app = require("../../app");
const should = require('should');
const request = require("supertest");

describe('/product', function () {





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


