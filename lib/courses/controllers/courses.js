const Model = require('eusi-sdk-utils-js');
const Context = require('../../../utils/context');
const eusi = global.eusi;

const CONTENT_TYPE_KEY = "course";

exports.index = function (req, res) {

    let template = __dirname + '/../views/courses';

    let context = {
        title: "EUSI - Courses",
        settings: {
            active: CONTENT_TYPE_KEY
        }
    };

    Context.eusiClient(eusi, req.user)
        .then((client) => {
            return client.getByType(CONTENT_TYPE_KEY)
        })
        .then((result) => {
            let courses = Model(result).all();
            console.log("COURSES", courses)
            Context.apply(context, {courses: courses})
            res.render(template, context);
        });
    ;

};

exports.one = function (req, res) {

    let template = __dirname + '/../views/single-course';

    let context = Context.create({
        settings: {
            active: CONTENT_TYPE_KEY
        }
    })

    Context.eusiClient(eusi, req.user)
        .then((client) => {
            return client.getById(req.params.id)
        })
        .then((result) => {
            let course = Model(result);
            Context.apply(context, {course: course, title: course.name})
            res.render(template, context);
        });


};