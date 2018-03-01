module.exports = () => {
    return (req, res, next) => {
        let token = req.cookies['auth_token'];

        if (token) {
            const eusiClient = eusi(token);
            eusiClient.getUser()
                .then((user) => {
                    req.user = user || {};
                    next();
                })
                .catch(next);
        }
        else {
            req.user = {};
            next();
        }
    }
}