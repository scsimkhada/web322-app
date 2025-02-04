const fs = require("fs");

let items = [];
let categories = [];

/**
 * Initialize the service by loading items and categories data from JSON files.
 * @returns {Promise} Resolves when data is successfully loaded, rejects on error.
 */
function initialize() {
    return new Promise((resolve, reject) => {
        // Load items.json
        fs.readFile("./data/items.json", "utf8", (err, data) => {
            if (err) {
                console.error("Error reading items.json:", err);
                return reject("Unable to read items file.");
            }
            items = JSON.parse(data);

            // Load categories.json
            fs.readFile("./data/categories.json", "utf8", (err, data) => {
                if (err) {
                    console.error("Error reading categories.json:", err);
                    return reject("Unable to read categories file.");
                }
                categories = JSON.parse(data);
                resolve();
            });
        });
    });
}

/**
 * Get all items.
 * @returns {Promise} Resolves with all items, rejects if no items exist.
 */
function getAllItems() {
    return new Promise((resolve, reject) => {
        if (items.length > 0) {
            resolve(items);
        } else {
            reject("No results returned.");
        }
    });
}

/**
 * Get published items.
 * @returns {Promise} Resolves with published items, rejects if none exist.
 */
function getPublishedItems() {
    return new Promise((resolve, reject) => {
        const publishedItems = items.filter(item => item.published);
        if (publishedItems.length > 0) {
            resolve(publishedItems);
        } else {
            reject("No published items found.");
        }
    });
}

/**
 * Get all categories.
 * @returns {Promise} Resolves with all categories, rejects if no categories exist.
 */
function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length > 0) {
            resolve(categories);
        } else {
            reject("No categories found.");
        }
    });
}

// Export functions
module.exports = {
    initialize,
    getAllItems,
    getPublishedItems,
    getCategories
};
