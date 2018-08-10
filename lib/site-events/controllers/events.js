const Context = require('../../../utils/context');
const viewPath = (viewName) => `${__dirname}/../views/${viewName}`;
const template = viewPath('single-event');
const listTemplate = viewPath('all-events');

const Model = require('eusi-sdk-utils-js');

exports.one = (req, res) => {
    Context.eusiClient(req.cookies.auth_token)
        .then(eusiClient => {
            return eusiClient.getById(req.params.id);
        })
        .then(event => {
            res.render(template, Context.apply(Context.create(req, {
                title: `${event.title} | Eusi University`,
                settings: {
                    active: 'event'
                }
            }), { event: Model(event) }));
        });
};

exports.all = (req, res) => {
    const context = Context.create(req, {
        title: 'Events | Eusi University',
        settings: {
            active: 'event'
        }
    });

    Context.eusiClient(req.cookies.auth_token)
        .then(eusiClient => eusiClient.getByModel('event'))
        .then(events => Model(events).all())
        .then(events => {
            res.render(listTemplate, Context.apply(context, {
                events
            }));
        });
};