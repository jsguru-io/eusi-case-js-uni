const PAGE_SETTINGS_ID = "9caefb79-7ea9-4e5a-a5d5-fbbb39ffebbc";
const Context = require('../utils/context');
const Model = require('eusi-sdk-utils-js');
const config = require('../config/config.js');

module.exports = () => {
    return (req, res, next) => {
        let token = req.cookies['auth_token'];
        let eusiClient;
        res.locals = {
            newsletterFormKey: config.newsletterFormKey,
            authToken: token,
            bucketId: config.bucketId,
            bucketSecret: config.bucketSecret
        };

        Context.eusiClient(req.cookies.auth_token)
            .then((client) => {
                eusiClient = client;
                let promise;

                if (token) {
                    promise = client.getUser()
                }
                else {
                    promise = Promise.resolve();
                }

                return promise;
            })
            .then((user) => {
                req.user = user;
                return eusiClient.getById(PAGE_SETTINGS_ID);
            })
            .then((config) => {
                req.$config = Model(config);
                next();
            })
            .catch(error => {
                next(error.error);
            });
    }
};