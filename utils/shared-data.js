const PAGE_SETTINGS_ID = "39e5bb7a-c921-4f7e-b7af-55326ec85611";
const Context = require('../utils/context');
const Model = require('eusi-sdk-utils-js');

module.exports = () => {
    return (req, res, next) => {
        let token = req.cookies['auth_token'];
        let eusiClient;
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
            });
    }
};