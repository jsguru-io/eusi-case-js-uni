const Model = require('eusi-sdk-utils-js');
const Context = require('../../../utils/context');
const eusi = global.eusi;

exports.page = function (req, res) {

    let template = __dirname + '/../views/' + req.params.id;

    let context = Context.create(req, {
        title: "Eusi University",
        settings: {
            active: 'home'
        },
        contact: req.$config
    });


    res.render(template, context);
};
