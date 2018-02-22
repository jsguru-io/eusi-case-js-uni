require('app-module-path').addPath(__dirname + '/lib');

exports.setup = function (runningApp, callback) {
    // Nothing ever comes from "x-powered-by", but a security hole
    runningApp.disable("x-powered-by");

    // Choose your favorite view engine(s)
    //runningApp.set('view engine', 'handlebars');
    runningApp.set('view engine', 'ejs');
    runningApp.use(require('express-ejs-layouts'));
    //runningApp.engine('ejs', require('ejs').__express);

    //// you could use two view engines in parallel (if you are brave):
    // runningApp.set('view engine', 'j2');
    // runningApp.engine('j2', require('swig').renderFile);


    //---- Mounting well-encapsulated application modules (so-called: "mini-apps")
    //---- See: http://expressjs.com/guide/routing.html and http://vimeo.com/56166857
    runningApp.use('/home', require('home')); // attach to sub-route
    runningApp.use('/courses', require('courses')); // attach to sub-route
    runningApp.use('/teachers', require('teachers')); // attach to sub-route
    runningApp.use('/blog', require('blog')); // attach to sub-route
    runningApp.use('/pages', require('page')); // attach to sub-route
    runningApp.use('/join', require('auth')); // attach to sub-route
    runningApp.use('/', require('home')); // attach to root route

    // API endpoint attached to root route:
    runningApp.use('/api', require('homedoc')); // attach to sub-route

    // If you need websockets:
    // var socketio = require('socket.io')(runningApp.http);
    // require('fauxchatapp')(socketio);

    if (typeof callback === 'function') {
        callback(runningApp);
    }
};
