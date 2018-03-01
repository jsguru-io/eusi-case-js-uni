const eusi = global.eusi;


const pretty = (obj) => {
    return JSON.stringify(obj, null, 2);
}

const BLOG_TYPE_NAME = "blogs";

exports.index = function (req, res) {

    let template = __dirname + '/../views/blog';
    let name = req.query.name || "";

    let context = {
        title: "EUSI - Blogs",
        settings : {
            active: 'blog'
        }
    };

    eusi.getAccess()
        .then((response) => {
            const eusiClient = eusi(response.token);
            eusiClient.getByType(BLOG_TYPE_NAME)
                .then((result) => {

                    let blogs = mapper.create(result).list();
                    Object.assign(context, {blogs: blogs})

                    console.log('blogS', pretty(result));
                    res.render(template, context);
                });
        });

};

exports.one = function (req, res) {

    let template = __dirname + '/../views/post';
    let name = req.query.name || "";

    let context = {
        title: "EUSI - Blogs - Single",
        settings : {
            active: 'blog'
        }
    };

    eusi.getAccess()
        .then((response) => {
            const eusiClient = eusi(response.token);
            eusiClient.getById(req.params.id)
                .then((result) => {
                    let post = mapper.create(result);
                    Object.assign(context, {post: post})
                    console.log('SINGLE blog', pretty(result));
                    res.render(template, context);

                });
        });


};