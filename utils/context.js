const Context = () => {

}

Context.create = (req, data) => {
    return Object.assign({
        user: req.user,
        data
    });
};

Context.apply = (context, data) => {
    return Object.assign(context, data);
};

Context.eusiClient = (eusi, user) => {
    let token = user.user;
    return token ? eusi(token) : eusi.getAccess()
        .then((response) => {
            return eusi(response.token);
        })
}

module.exports = Context;