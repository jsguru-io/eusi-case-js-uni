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
        thumb(media) {
            return media.thumbnails && media.thumbnails['400x400'];
        },
        formatters: {
            dateTime(...args) {
                return moment(...args).format('DD-MM-YYYY HH:mm:ss');
            },
            date(...args) {
                return moment(...args).date();
            },
            monthName(...args){
                return ['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul', 'Avg', 'Sept', 'Okt', 'Nov', 'Dec'][moment(...args).month() + 1];
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