import express from "express";
import { PORT } from "./Config/serverConfig.js";

const app = express();

app.get("/", (req, res) => {    
    res.status(200).json({
        name: "slackchatpro",
        version: "1.0.0",
        owner:"Shubham Ashish"
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})