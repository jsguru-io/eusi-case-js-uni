const Model = require('eusi-sdk-utils-js');
const Context = require('../../../utils/context');

const pretty = (obj) => {
    return JSON.stringify(obj, null, 2);
};

const COURSE_TYPE_NAME = 'course';
const TEACHER_TYPE_NAME = 'teacher';
const BLOG_TYPE_NAME = "blogs";
const TESTIMONIAL_TYPE_NAME = "testimonial";
const EVENT_TYPE_NAME = "event";
const GALLERY_ID = "4a308e3c-dfc1-447b-8239-52652235c8e6";

exports.index = function (req, res, next) {
    const template = __dirname + '/../views/home';

    const context = Context.create(req, {
        error: null,
        title: "Welcome",
        settings: {
            active: 'home'
        }
    });

    Context.eusiClient(req.cookies.auth_token)
        .then((eusiClient) => {
            return Promise.all([
                eusiClient.getByModel(COURSE_TYPE_NAME).then((result) => {
                    return Model(result).all();
                }),
                eusiClient.getByModel(BLOG_TYPE_NAME).then(result => {
                    return Model(result).all();
                }),
                eusiClient.getByModel(TEACHER_TYPE_NAME).then(result => {
                    return Model(result).all();
                }),
                eusiClient.getByModel(TESTIMONIAL_TYPE_NAME).then(result => {
                    return Model(result).all();
                }),
                eusiClient.getByModel(EVENT_TYPE_NAME).then(result => {
                    return Model(result).all();
                }),
                eusiClient.getById(GALLERY_ID).then(result => {
                    return Model(result);
                })
            ])
                .then(([courses, blogs, teachers, testimonials, events, gallery]) => ({
                    courses,
                    blogs,
                    teachers,
                    testimonials,
                    events,
                    gallery
                }))
                .then(result => Context.apply(context, result))
                .then(result => {
                    res.render(template, result);
                });
        });
};