const Model = require('eusi-sdk-utils-js');
const Context = require('../../../utils/context');

const CONTENT_TYPE_KEY = "course";
const CATEGORY_TAXONOMY_KEY = "category";
exports.index = function (req, res) {
    const categoryId = req.query.category;
    const name = req.query.name;
    const template = __dirname + '/../views/courses';
    const context = Context.create(req, {
        title: "Courses | Eusi University",
        settings: {
            active: CONTENT_TYPE_KEY
        }
    });

    let eusiClient;
    Context.eusiClient(req.cookies.auth_token)
        .then((client) => {
            eusiClient = client;
            return name ?
                eusiClient.get({
                    title: {
                        $like: `%${name}%`
                    },
                    model: CONTENT_TYPE_KEY
                })
                : categoryId
                    ? eusiClient.getByTaxonomyPath(categoryId)
                    : eusiClient.getByModel(CONTENT_TYPE_KEY)
        })
        .then((result) => {
            let courses = Model(result).all();
            console.log("COURSES", result);
            Context.apply(context, { courses: courses });
            Context.apply(context, {
                allPayments: courses
                    .map(course => (course.payments || []).map(payment => ({
                        ...payment,
                        courseTitle: course.title
                    })))
                    .reduce((acc, payments) => acc.concat(payments), [])
            });

            Context.apply(context, { queryName: name });
            return eusiClient.getTaxonomy(CATEGORY_TAXONOMY_KEY);
        })
        .then((taxonomy) => {
            Context.apply(context, { taxonomy: taxonomy });
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
    });

    Context.eusiClient(req.cookies.auth_token)
        .then((client) => {
            return client.getById(req.params.id)
        })
        .then((result) => {
            let course = Model(result);
            Context.apply(context, { course, title: `${course.title}  | Eusi University` });
            res.render(template, context);
        });
};

exports.buy = (req, res) => {
    Context.eusiClient(req.cookies.auth_token)
        .then(eusiClient => {
            return eusiClient.purchaseContent(req.params.id, {
                description: 'Buying course',
                currency: 'ETH'
            });
        }).then(invoice => {
        res.redirect(invoice.payment_url);
    });
};