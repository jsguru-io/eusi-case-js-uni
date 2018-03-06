const Model = require('eusi-sdk-utils-js');
const Context = require('../../../utils/context');
const eusi = global.eusi;

const CONTENT_TYPE_KEY = "course";
const CATEGORY_TAXONOMY_KEY = "category";
exports.index = function (req, res) {

    let categoryId = req.query.category;
    let name = req.query.name;
    let template = __dirname + '/../views/courses';
    let eusiClient;
    let context = Context.create(req, {
        title: "Courses | Eusi University",
        settings: {
            active: CONTENT_TYPE_KEY
        }
    });

    Context.eusiClient(eusi, req.user)
        .then((client) => {
            eusiClient = client;
            return name ?
                eusiClient.get({
                    name: {
                        $like: '%' + name + '%'
                    }
                })
                : categoryId
                    ? eusiClient.getByTaxonomyPath(categoryId)
                    : eusiClient.getByType(CONTENT_TYPE_KEY)
        })
        .then((result) => {
            let courses = Model(result).all();
            console.log("COURSES", result);
            Context.apply(context, {courses: courses});
            Context.apply(context, {queryName: name});

            return eusiClient.getTaxonomy(CATEGORY_TAXONOMY_KEY);
        })
        .then((taxonomy) => {
            Context.apply(context, {taxonomy: taxonomy})
            // console.log("TAXONOMY", taxonomy.items.rows);
            res.render(template, context);
        });
    ;

};

exports.one = function (req, res) {

    let template = __dirname + '/../views/single-course';

    let context = Context.create(req, {
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
            Context.apply(context, {course: course, title: `${course.name}  | Eusi University`})
            res.render(template, context);
        });


};