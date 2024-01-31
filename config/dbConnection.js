const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connection_string =process.env.connection_string;  //now port is coming from a new file .env which will have all the vars so that some other user may use them.



const dbConnection = async ()=>{
        try{
            const connect = await mongoose.connect(connection_string);   //from env variables

            console.log("db connected " + connect.connection.name + " on host "+ connect.connection.host);
        }

        catch{
            console.log("db connection failed...")
            process.exit(1);

        }

}

module.exports = dbConnection;