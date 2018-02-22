const moment = require('moment');

exports.date = (value, format) => {
    format = format || 'Do MMMM, YYYY';
    return moment(value).format(format);
}