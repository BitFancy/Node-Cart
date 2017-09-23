"use strict";

const mongoose = require("mongoose");
const mongoUtils = require("../bin/mongo-utils");

getAllCollections();

function getAllCollections(){
    return mongoUtils.seedDb();
    
    
}