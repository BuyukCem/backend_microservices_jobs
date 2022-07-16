const mongoose = require("mongoose");
let db = mongoose.connection

function connect() {
    console.log(process.env.NODE_ENV)
    if(process.env.NODE_ENV !== 'production') {
        const url = 'mongodb://'+process.env.MONGO_HOST+':'+process.env.MONGO_PORT+'/'+process.env.MONGO_DATABASE
        console.log(url)
        mongoose.connect(url,
            {useNewUrlParser: true, useUnifiedTopology: true})
        db.on('connected', () => console.log('Mongoose connected to db'))
        db.on('error', (err) => console.log(err.message))
    }
    if(process.env.NODE_ENV  == 'production') {
        console.log(process.env.MONGO_ATLAS_URL)
        try {
            mongoose.connect(
                process.env.MONGO_ATLAS_URL,
                { useNewUrlParser: true, useUnifiedTopology: true },
                () => console.log(" Mongoose is connected"),
            );
        } catch (e) {
            console.log("could not connect");
        }
        const dbConnection = mongoose.connection;
        dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
    }
}

function disconnect() {
    db.on('disconnected', () => console.log('Mongoose connection is disconnected.'))
}

module.exports = {db, connect, disconnect};
