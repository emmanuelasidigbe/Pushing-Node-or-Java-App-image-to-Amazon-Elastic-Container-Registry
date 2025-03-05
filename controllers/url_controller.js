"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectUrl = exports.shortenUrl = void 0;
exports.renderHomepage = renderHomepage;
const urlModel = __importStar(require("../models/url_model"));
const validator_1 = require("validator");
function renderHomepage(req, res) {
    res.render("index", { data: urlModel.getRecentUrls() });
}
const shortenUrl = (req, res) => {
    const longUrl = req.body.longUrl;
    // Validate the URL
    if (!(0, validator_1.isURL)(longUrl)) {
        res.status(404).render("error", { message: "Invalid url" });
        return;
    }
    // Generate a random 6-character short code
    const shortCode = Math.random().toString(36).substr(2, 6);
    // Save the mapping
    urlModel.saveUrl(shortCode, longUrl);
    res.redirect("/");
};
exports.shortenUrl = shortenUrl;
// Handle redirection
const redirectUrl = (req, res) => {
    const shortCode = req.params.shortCode;
    const longUrl = urlModel.findUrl(shortCode);
    if (longUrl) {
        res.redirect(longUrl);
    }
    else {
        res.status(404).render('error', { message: 'Short code not found.' });
    }
};
exports.redirectUrl = redirectUrl;
