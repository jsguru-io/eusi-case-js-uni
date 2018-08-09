const eusi = require('../lib/content');
const moment = require('moment');
const Context = () => {};

Context.create = (req, data) => {
    return Object.assign({}, data, {
        $user: req.user,
        $config: req.$config
    });
};

Context.apply = (context, data) => {
    return Object.assign(context, data, {
        formatters: {
            dateTime(...args) {
                return moment(...args).format('DD-MM-YYYY HH:mm:ss');
            },
            price(val) {
                return Number.parseFloat(val).toFixed(2);
            }
        }
    });
};

Context.eusiClient = (authToken) => {
    return authToken
        ? Promise.resolve(eusi(authToken))
        : eusi.getAccess()
            .then((response) => {
                return eusi(response.token);
            });
};

module.exports = Context;