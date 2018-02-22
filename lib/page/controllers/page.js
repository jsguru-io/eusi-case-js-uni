const model = require('../models/teachers.model');
const mapper = require('../../../utils/eusi-mapper');
const eusi = global.eusi;
const pretty = (obj) => {
    return JSON.stringify(obj, null, 2);
}

const TEACHER_TYPE_NAME = 'teacher';

exports.page = function (req, res) {

    let template = __dirname + '/../views/' + req.params.id;
    let name = req.query.name || "";

    let context = {
        title: "EUSI - Teachers",
        settings: {
            active: 'home'
        }
    };

    res.render(template, context);
};
