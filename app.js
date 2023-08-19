import express from "express";
import mongoose from "mongoose";
import todoHandler from "./routes/todoHandler.js";

const app = express();
const port = 3000;

const connectionString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/?authSource=admin`;

//Application routes
app.get('/', (req, res) => {    
    res.send("Hello!");
});

//Configure Middleware
app.use(express.json());
app.use("/todos", todoHandler);

//Start the application
//DB Connection
 mongoose.connect(connectionString, { useNewUrlParser: true })
     .then(() => {
            console.log("connection sucessful.");
            app.listen(port, () => {
                console.log(`App is listening on port ${port}`);
            });
     })
    .catch((err) => { console.error(err) });
