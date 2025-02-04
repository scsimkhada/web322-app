/*********************************************************************************
WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
No part of this assignment has been copied manually or electronically from any other source 
(including 3rd party web sites) or distributed to other students.

Name: Subash Chandra Simkhada
Student ID: 149827230
Date: 2025-02-04
Vercel Web App URL: [URL after deployment]
GitHub Repository URL: [Your GitHub Repo]
********************************************************************************/

const express = require("express");
const path = require("path");
const storeService = require("./store-service");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to serve static files
app.use(express.static("public"));

// Redirect "/" to "/about"
app.get("/", (req, res) => {
    console.log("Redirecting to /about");
    res.redirect("/about");
});

// Serve the "about.html" page for the "/about" route
app.get("/about", (req, res) => {
    console.log("Serving about.html");
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

// Route to get all published items
app.get("/shop", (req, res) => {
    storeService.getPublishedItems()
        .then(data => {
            console.log("Fetching published items...");
            res.json(data);
        })
        .catch(err => {
            console.error("Error fetching published items:", err);
            res.status(404).json({ message: err });
        });
});

// Route to get all items
app.get("/items", (req, res) => {
    storeService.getAllItems()
        .then(data => {
            console.log("Fetching all items...");
            res.json(data);
        })
        .catch(err => {
            console.error("Error fetching all items:", err);
            res.status(404).json({ message: err });
        });
});

// Route to get all categories
app.get("/categories", (req, res) => {
    storeService.getCategories()
        .then(data => {
            console.log("Fetching all categories...");
            res.json(data);
        })
        .catch(err => {
            console.error("Error fetching categories:", err);
            res.status(404).json({ message: err });
        });
});

// Custom 404 route handler
app.use((req, res) => {
    console.log(`404 - Page Not Found: ${req.url}`);
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Initialize the store service and start the server
storeService.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Express http server listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Unable to start server:", err);
    });
