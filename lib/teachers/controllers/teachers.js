const Model = require('eusi-sdk-utils-js');
const Context = require('../../../utils/context');

const pretty = (obj) => {
    return JSON.stringify(obj, null, 2);
};

const TEACHER_TYPE_NAME = 'teacher';

exports.index = function (req, res) {
    let template = __dirname + '/../views/teachers';

    let context = Context.create(req, {
        title: "Teachers | Eusi University",
        settings: {
            active: TEACHER_TYPE_NAME
        }
    });

    Context.eusiClient(req.cookies.auth_token)
        .then((client) => {
            client.getByModel(TEACHER_TYPE_NAME)
                .then((result) => {
                    let teachers = Model(result).all();
                    Context.apply(context, {teachers: teachers})
                    console.log('TEACHERS', pretty(result));
                    res.render(template, context);
                });

        });
};

exports.one = function (req, res) {
    const template = __dirname + '/../views/single-teacher';

    const context = Context.create(req, {
        settings: {
            active: TEACHER_TYPE_NAME
        }
    });

    Context.eusiClient(req.cookies.auth_token)
        .then((client) => {
            client.getById(req.params.id)
                .then((result) => {
                    let teacher = Model(result);
                    Context.apply(context, {teacher: teacher, title: `${teacher.title}  | Eusi University`});
                    console.log('SINGLE TEACHER', pretty(result));
                    res.render(template, context);
                });
        });
};