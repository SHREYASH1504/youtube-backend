// require("dotenv").config({ path: "./.env" }); // (not consistent with the rest of the codebase, so commented out)

import dotenv from "dotenv";
import connectDB from "./db/index.js";

import express from "express";

const app = express();


dotenv.config({ path: "./.env" });

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        });
    }) // Handle successful connection
    .catch((err) => {
        console.log("Database connection failed:", err);
    }); // Handle connection errors


 












/*
import express from "express";
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            app.on("error", (error) => {
                console.log("ERROR ", error);
                throw error;
            })

            app.listen(process.env.PORT, () => {
                console.log(`App is listening on port ${process.env.PORT}`);
            })
    } catch (error) {
        console.error("ERROR ", error);
        throw error;
    }
} )()
*/