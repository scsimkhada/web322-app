/*********************************************************************************
WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
No part of this assignment has been copied manually or electronically from any other source 
(including 3rd party web sites) or distributed to other students.

Name: [Your Name]  
Student ID: [Your ID]  
Date: [Current Date]  
Vercel Web App URL: [URL after deployment]  
GitHub Repository URL: [Your GitHub Repo]  
********************************************************************************/

const express = require("express");
const path = require("path");
const storeService = require("./store-service");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.get("/", (req, res) => res.redirect("/about"));
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "views", "about.html")));

app.get("/shop", (req, res) => {
    storeService.getPublishedItems()
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }));
});

app.get("/items", (req, res) => {
    storeService.getAllItems()
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }));
});

app.get("/categories", (req, res) => {
    storeService.getCategories()
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }));
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

storeService.initialize()
    .then(() => {
        app.listen(PORT, () => console.log(`Express http server listening on port ${PORT}`));
    })
    .catch(err => console.log("Unable to start server: ", err));
