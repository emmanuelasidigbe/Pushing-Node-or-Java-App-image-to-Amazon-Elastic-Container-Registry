"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentUrls = exports.findUrl = exports.saveUrl = void 0;
const urlMappings = {}; // { shortCode: longUrl }
const recentUrls = []; // Last 5 shortened URLs
// Save a new URL mapping
const saveUrl = (shortCode, longUrl) => {
    urlMappings[shortCode] = longUrl;
    // Update recent URLs list
    recentUrls.unshift({ shortCode, longUrl });
    if (recentUrls.length > 5)
        recentUrls.pop();
};
exports.saveUrl = saveUrl;
// Find the original URL by short code
const findUrl = (shortCode) => {
    return urlMappings[shortCode];
};
exports.findUrl = findUrl;
// Get the recent shortened URLs
const getRecentUrls = () => {
    return recentUrls;
};
exports.getRecentUrls = getRecentUrls;
