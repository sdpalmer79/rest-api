const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DEFAULT_DB}?retryWrites=true&w=majority`;

let db;

const connect = () => {
    
    const promise = new Promise((resolve, reject) => {
        if(db == null){    
            mongoClient.connect(MONGODB_URI)
                .then((result) => {
                    //console.log(result);
                    db = result.db();
                    resolve(db);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        } else{
            resolve(db);
        }
    });
    return promise;
}

exports.connect = connect;