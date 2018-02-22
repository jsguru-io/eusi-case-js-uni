const mapper = require('../../../utils/eusi-mapper');
const greeter = require('../models/home.model');
const eusi = global.eusi;

const pretty = (obj) => {
    return JSON.stringify(obj, null, 2);
}

const COURSE_TYPE_NAME = 'course';
const TEACHER_TYPE_NAME = 'teacher';
const BLOG_TYPE_NAME = "blogs";
const TESTIMONIAL_TYPE_NAME = "testimonial";

exports.index = function (req, res, next) {

    let template = __dirname + '/../views/home';
    let name = req.query.name || "";

    let context = {
        title: "Welcome",
        settings: {
            active: 'home'
        }
    };

    eusi.getAccess()
        .then((response) => {
            const eusiClient = eusi(response.token);

            eusiClient.getByType(COURSE_TYPE_NAME)
                .then((result) => {
                    let courses = mapper.create(result).list();
                    Object.assign(context, {courses: courses});
                    return eusiClient.getByType(BLOG_TYPE_NAME);
                })
                .then((result) => {

                    let blogs = mapper.create(result).list();
                    Object.assign(context, {blogs: blogs})

                    return eusiClient.getByType(TEACHER_TYPE_NAME);
                })
                .then((result) => {
                    let teachers = mapper.create(result).list();
                    Object.assign(context, {teachers: teachers})

                    return eusiClient.getByType(TESTIMONIAL_TYPE_NAME);
                })
                .then((result) => {
                    let testimonials = mapper.create(result).list();
                    Object.assign(context, {testimonials: testimonials})

                    res.render(template, context);
                });

        });


};