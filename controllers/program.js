const mongoDb = require('../util/database');
const errors = require('../util/errors');
const Program = require('../models/program');
const ObjectId = require('mongodb').ObjectId; 

const collection = 'Programs';
const domain = 'mongoDB'

exports.getProgram = (req, res, next) => {

    const id = req.query.id;

    mongoDb.connect()
    .then((db) => {
        return db.collection(collection)
        .find({_id: new ObjectId(id)})
        .toArray();
    })
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).send(errors.buildErr(err, domain));
    });
};

exports.updateProgram = (req, res, next) => {
    
    const id = req.query.id;
    const {name, description} = req.body;

    mongoDb.connect()
    .then((db) => {
        return db.collection(collection).updateMany({_id: new ObjectId(id)}, {$set: new Program(name, description)});
    })
    .then((result) => {
        const {matchedCount, modifiedCount} = result;

        if(matchedCount == null || modifiedCount == null){
            throw {message: 'Invalid response received from mongoDb'};
        }
        res.status(matchedCount == 0 && modifiedCount == 0 ? 404 : 200)
        .json({matchedCount: matchedCount, modifiedCount: modifiedCount});
    })
    .catch((err) => {
        res.status(500).send(errors.buildErr(err, domain));
    });
};

exports.createProgram = (req, res, next) => {

    const {name, description} = req.body;

    //TODO - validate name, description

    mongoDb.connect()
    .then((db) => {
        return db.collection(collection).insertOne(new Program(name, description));
    })
    .then((result) => {
        const {insertedId} = result;

        if(insertedId == null){
            throw {message: 'Invalid response received from mongoDb'};
        }
        res.status(201).json({id: insertedId});
    })
    .catch((err) => {
        res.status(500).send(errors.buildErr(err, domain));
    });
}

exports.deleteProgram = (req, res, next) => {
    
    const id = req.query.id;

    mongoDb.connect()
    .then((db) => {
        return db.collection(collection).deleteMany({_id: new ObjectId(id)});
    })
    .then((result) => {
        const {deletedCount} = result;
        res.status(200).json({deletedCount: deletedCount});
    })
    .catch((err) => {
        res.status(500).send(errors.buildErr(err, domain));
    });
};

exports.queryPrograms = (req, res, next) => {

};



