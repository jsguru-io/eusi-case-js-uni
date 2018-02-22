const model = require('../models/teachers.model');
const mapper = require('../../../utils/eusi-mapper');
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
    let name = req.query.name || "";

    let context = {
        title: "EUSI - Teachers",
        settings: {
            active: 'teacher'
        }
    };

    eusi.getAccess()
        .then((response) => {
            const eusiClient = eusi(response.token);
            eusiClient.getByType(TEACHER_TYPE_NAME)
                .then((result) => {

                    let teachers = mapper.create(result).list();
                    Object.assign(context, {teachers: teachers})

                    console.log('TEACHERS', pretty(result));
                    res.render(template, context);
                });

        });
};

exports.one = function (req, res) {

    let template = __dirname + '/../views/single-teacher';
    let name = req.query.name || "";

    let context = {
        siteTitle: "EUSI - Teachers - Single",
        settings: {
            active: 'teacher'
        }
    };

    eusi.getAccess()
        .then((response) => {
            const eusiClient = eusi(response.token);
            eusiClient.getById(req.params.id)
                .then((result) => {
                    let teacher = mapper.create(result);
                    Object.assign(context, {teacher: teacher})
                    console.log('SINGLE TEACHER', pretty(result));
                    res.render(template, context);

                });
        });


};