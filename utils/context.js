const Context = () => {

}

Context.create = (req, data) => {
    return Object.assign({}, data, {
        $user: req.user,
        $config: req.$config
    });
};

Context.apply = (context, data) => {
    return Object.assign(context, data);
};

Context.eusiClient = (eusi, user) => {
    let token = user ? user.token : null;
    return token
        ? Promise.resolve(eusi(token))
        : eusi.getAccess()
            .then((response) => {
                return eusi(response.token);
            });
}

module.exports = Context;