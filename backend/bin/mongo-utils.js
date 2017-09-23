"use strict";
const Promise = require("bluebird");
const Product = require("../app_modules/product/model");

const MongoClient = require('mongodb').MongoClient;


const seedJson = require("../tests/integration-tests/seeds/basic.seed");



class MongoUtils {

    constructor(db) {
        this._db = db;
    }

    getAllCollectionsAsync() {
        return Promise.resolve(this._db.collections());
    }

    deleteCollectionAsync(collectionName) {
        return Promise.resolve(this._db.dropCollection(collectionName))
    }

    retrieveCollectionName(collection) {
        return collection.s.name;
    }

    retrieveCollectionsFromSeedFile(seedFile){
        return Object.keys(seedJson);
    }

    createCollectionAsync(collectionName) {
        return this._db.createCollection(collectionName)
            
    }

    fillCollectionAsync(collectionName, dataArray){
        return this._db.collection(collectionName).insertMany(dataArray);
    
    }

    seedDb(seedJson) {
        return this.getAllCollectionsAsync()
            .then((collections) => collections.map((collection) => this.retrieveCollectionName(collection)))
            .each((collectionName) => this.deleteCollectionAsync(collectionName))
            .then(() => this.retrieveCollectionsFromSeedFile(seedJson))
            .each((collectionName) => this.createCollectionAsync(collectionName))
            .each((collectionName) => this.fillCollectionAsync(collectionName, seedJson[collectionName]))
    }

}

module.exports = MongoUtils;