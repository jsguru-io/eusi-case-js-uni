const eusi = global.eusi;

const me = (token) => {
    return eusi.getUser(token);
};


exports.me = me;