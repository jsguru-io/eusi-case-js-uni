const Model = require('eusi-sdk-utils-js');
const Context = require('../../../utils/context');
const eusi = global.eusi;

const getContentByKey = (content, type) => {
    return content.filter((item) => {
        return item.type === type;
    })[0];
}

const pretty = (obj) => {
    return JSON.stringify(obj, null, 2);
}

const TEACHER_TYPE_NAME = 'teacher';

exports.index = function (req, res) {

    let template = __dirname + '/../views/teachers';

    let context = Context.create(req, {
        title: "Teachers | Eusi University",
        settings: {
            active: TEACHER_TYPE_NAME
        }
    });

    Context.eusiClient(eusi, req.user)
        .then((client) => {
            client.getByType(TEACHER_TYPE_NAME)
                .then((result) => {
                    let teachers = Model(result).all();
                    Context.apply(context, {teachers: teachers})
                    console.log('TEACHERS', pretty(result));
                    res.render(template, context);
                });

        });
};

exports.one = function (req, res) {

    let template = __dirname + '/../views/single-teacher';

    let context = Context.create(req, {
        settings: {
            active: TEACHER_TYPE_NAME
        }
    });

    Context.eusiClient(eusi, req.user)
        .then((client) => {
            client.getById(req.params.id)
                .then((result) => {
                    let teacher = Model(result);
                    Context.apply(context, {teacher: teacher, title: `${teacher.name}  | Eusi University`})
                    console.log('SINGLE TEACHER', pretty(result));
                    res.render(template, context);

                });
        });


};