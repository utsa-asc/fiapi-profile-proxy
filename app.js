const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config();
// console.log(process.env);

const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
// const PORT = process.env.PORT;
// const HOST = "localhost";
const API_SERVICE_URL = "https://fiapi.academicanalytics.com/api";
const PIXEL_SERVICE_URL = "https://connect.facebook.net";

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to our UTSA Faculty Insights API.');
});

// TODO: make more restrictive as we get closer to website launch
app.use(cors({ origin: '*' }));

// Authorization
// app.use('', (req, res, next) => {
//     next();
// });

// Proxy endpoints
app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    headers: {
        "x-api-key": process.env.FIAPI_KEY
    },
    pathRewrite: {
        [`^/api`]: '',
    },
}));

app.use('/pixel', createProxyMiddleware({
    target: PIXEL_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/pixel`]: '',
    },
}));

module.exports = app;