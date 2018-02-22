const model = require('../models/auth');
const mapper = require('../../../utils/eusi-mapper');
const eusi = global.eusi;


const pretty = (obj) => {
    return JSON.stringify(obj, null, 2);
}

exports.index = function (req, res) {

    let template = __dirname + '/../views/join';
    let name = req.query.name || "";

    let context = {
        title: "EUSI - Join",
        settings: {
            active: 'join'
        }
    };

    res.render(template, context);

};

exports.loginSuccess = function (req, res) {

    let token = req.query.token;

    if (token) {
        res.cookie('auth_token', "Bearer " + token);
    }

    res.redirect("/");

};

exports.register = function (req, res, next) {

    let input = req.body;

    eusi
        .register({
            email: input.email,
            password: input.password,
            first_name: input.first_name,
            last_name: input.last_name
        })
        .then((user) => {
            if (user.token) {
                res.cookie('auth_token', "Bearer " + user.token);
                res.redirect("/");
            }
        })
        .catch(next);
};

exports.login = function (req, res, next) {

    let input = req.body;

    eusi
        .login(input.email, input.password)
        .then((user) => {
            if (user.token) {
                res.cookie('auth_token', "Bearer " + user.token);
                res.redirect("/");
            }
        })
        .catch(next);
};