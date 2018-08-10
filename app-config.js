require('app-module-path').addPath(__dirname + '/lib');
const cookieParser = require('cookie-parser');
const sharedData = require('./utils/shared-data');

exports.setup = function (app, callback) {
    app.disable("x-powered-by");
    app.use(cookieParser());
    app.set('view engine', 'ejs');
    app.use(require('express-ejs-layouts'));
    app.use(sharedData());

    // Routes
    app.use('/home', require('home'));
    app.use('/courses', require('courses'));
    app.use('/teachers', require('teachers'));
    app.use('/blog', require('blog'));
    app.use('/pages', require('page'));
    app.use('/join', require('auth'));
    app.use('/events', require('site-events'));
    app.use('/', require('home')); 

    // API endpoint attached to root route:
    app.use('/api', require('homedoc'));

    // If you need websockets:
    // var socketio = require('socket.io')(runningApp.http);
    // require('fauxchatapp')(socketio);

    if (typeof callback === 'function') {
        callback(app);
    }
};
