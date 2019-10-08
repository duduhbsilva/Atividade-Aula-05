const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();
const port = 3000;
const {
    STORE_API_URL,
    AUDIT_API_URL,
    AUTHENTICATION_API_URL,
    TRANSACTION_API_URL,
} = require('./URLs');

const storeServiceProxy = httpProxy(STORE_API_URL);
const auditServiceProxy = httpProxy(AUDIT_API_URL);
const authenticationServiceProxy = httpProxy(AUTHENTICATION_API_URL);
const transactionServiceProxy = httpProxy(TRANSACTION_API_URL);

app.get('/', (req, res) => res.send('Hello Gateway API'));
app.get('/v1/public/payments', (req, res, next) => storeServiceProxy(req, res, next));
app.get('/v1/public/validations', (req, res, next) => auditServiceProxy(req, res, next));
app.get('/v1/public/users', (req, res, next) => authenticationServiceProxy(req, res, next));
app.get('/v1/public/creditCards', (req, res, next) => transactionServiceProxy(req, res, next));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));