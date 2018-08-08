const Model = require('eusi-sdk-utils-js');
const Context = require('../../../utils/context');
const eusi = global.eusi;


const BLOG_TYPE_NAME = "blogs";

exports.index = function (req, res) {

    let template = __dirname + '/../views/blog';
    let name = req.query.name || "";

    let context = Context.create(req, {
        title: "Blog | Eusi University",
        settings: {
            active: BLOG_TYPE_NAME
        }
    });

    Context.eusiClient(req.cookies.auth_token)
        .then((client) => {
            client.getByType(BLOG_TYPE_NAME)
                .then((result) => {
                    let blogs = Model(result).all();
                    Context.apply(context, {blogs: blogs});
                    res.render(template, context);
                });
        });

};

exports.one = function (req, res) {

    let template = __dirname + '/../views/post';
    let name = req.query.name || "";

    let context = Context.create(req, {
        settings: {
            active: 'blog'
        }
    });

    Context.eusiClient(req.cookies.auth_token)
        .then((client) => {
            client.getById(req.params.id)
                .then((result) => {
                    let post = Model(result);
                    Context.apply(context, {post: post, title: `${post.name}  | Eusi University`});
                    console.log("BLOG DETAIL CONTEXT", context);

                    res.render(template, context);
                });
        });


};