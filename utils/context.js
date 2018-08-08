const eusi = require('../lib/content');

const Context = () => {};

Context.create = (req, data) => {
    return Object.assign({}, data, {
        $user: req.user,
        $config: req.$config
    });
};

Context.apply = (context, data) => {
    return Object.assign(context, data);
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