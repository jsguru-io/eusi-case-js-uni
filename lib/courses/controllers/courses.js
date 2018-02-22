const model = require('../models/courses.model');
const mapper = require('../../../utils/eusi-mapper');
const eusi = global.eusi;


const pretty = (obj) => {
    return JSON.stringify(obj, null, 2);
}

const COURSE_TYPE_NAME = "course";

exports.index = function (req, res) {

    let template = __dirname + '/../views/courses';
    let name = req.query.name || "";

    let context = {
        title: "EUSI - Courses",
        settings : {
            active: 'course'
        }
    };

    eusi.getAccess()
        .then((response) => {
            const eusiClient = eusi(response.token);
            eusiClient.getByType(COURSE_TYPE_NAME)
                .then((result) => {

                    let courses = mapper.create(result).list();
                    Object.assign(context, {courses: courses})

                    console.log('COURSES', pretty(result));
                    res.render(template, context);
                });

            /*eusiClient.getById('a8725329-6036-4037-b299-d28ac8dd0412')
                .then((result) => {
                    context.mainPhoto = getContentByKey(result.content, "main-photo").media[0];
                    context.mainVideoUrl = getContentByKey(result.content, "video").media[0].url.replace('watch?v=', 'embed/');
                    context.name = result.name;
                    context.summary = getContentByKey(result.content, "summary").value;
                    console.log('RESULT', pretty(result));
                    res.render(template, context);

                });*/
        });

};

exports.one = function (req, res) {

    let template = __dirname + '/../views/single-course';
    let name = req.query.name || "";

    let context = {
        title: "EUSI - Courses - Single",
        settings : {
            active: 'course'
        }
    };

    eusi.getAccess()
        .then((response) => {
            const eusiClient = eusi(response.token);
            eusiClient.getById(req.params.id)
                .then((result) => {
                    let course = mapper.create(result);
                    Object.assign(context, {course: course})
                    console.log('SINGLE COURSE', pretty(result));
                    res.render(template, context);

                });
        });


};