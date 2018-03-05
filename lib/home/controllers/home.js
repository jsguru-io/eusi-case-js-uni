const Model = require('eusi-sdk-utils-js');
const Context = require('../../../utils/context');

const eusi = global.eusi;

const pretty = (obj) => {
    return JSON.stringify(obj, null, 2);
}

const COURSE_TYPE_NAME = 'course';
const TEACHER_TYPE_NAME = 'teacher';
const BLOG_TYPE_NAME = "blogs";
const TESTIMONIAL_TYPE_NAME = "testimonial";
const EVENT_TYPE_NAME = "event";
const GALLERY_ID = "9244a04b-b47e-4819-a5fd-a1f60820f598";

exports.index = function (req, res, next) {

    let template = __dirname + '/../views/home';
    let name = req.query.name || "";

    let context = Context.create(req, {
        error: null,
        title: "Welcome",
        settings: {
            active: 'home'
        }
    });

    console.log('CONTEXT', context)


    eusi.getAccess()
        .then((response) => {
            const eusiClient = eusi(response.token);

            eusiClient.getByType(COURSE_TYPE_NAME)
                .then((result) => {
                    let courses = Model(result).all();
                    Context.apply(context, {courses: courses});
                    return eusiClient.getByType(BLOG_TYPE_NAME);
                })
                .then((result) => {

                    let blogs = Model(result).all();
                    Context.apply(context, {blogs: blogs})

                    return eusiClient.getByType(TEACHER_TYPE_NAME);
                })
                .then((result) => {
                    let teachers = Model(result).all();
                    Context.apply(context, {teachers: teachers})

                    return eusiClient.getByType(TESTIMONIAL_TYPE_NAME);
                })
                .then((result) => {
                    let testimonials = Model(result).all();
                    Context.apply(context, {testimonials: testimonials})
                    return eusiClient.getByType(EVENT_TYPE_NAME);
                })
                .then((result) => {
                    let events = Model(result).all();
                    Context.apply(context, {events: events})
                    return eusiClient.getById(GALLERY_ID);
                })
                .then((result) => {
                    let gallery = Model(result);
                    console.log("GALLERY", gallery);
                    Context.apply(context, {gallery: gallery})
                    res.render(template, context);
                });

        });


};