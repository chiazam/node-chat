routemod = require('../class/routehandler.js');

const signupnow = (body, files) => {

    if (body.hasOwnproperty('name') && body.hasOwnproperty('user') && body.hasOwnproperty('pass')) {

        if (body.name.length === 0) {

            return { err: "Input your Fullname!" };

        } else if (body.user.length === 0) {

            return { err: "Input your Username!" };

        } else if (body.pass.length === 0) {

            return { err: "Input your Password!" };

        } else if (files.length === 0) {

            return { err: "Input your Picture!" };

        } else {

        }

    } else {

        return { err: "Permission Denied!" };

    }

};

const signupfunc = (req, res) => {

    // res.statusCode = 200;
    // console.log(req.body);
    // console.log(req.params);

    req.params = routemod.routequery(req).query;
    res.setHeader('Content-Type', 'application/json');

    let api = signupnow(req.body, req.files);

    res.end(JSON.stringify({
        api: api,
        req: [req.body, req.params, req.files]
    }));

};

exports.signuproute = {
    method: 'post',
    path: "/api/signup/",
    func: signupfunc,
    uploads: {
        name: "pix",
        num: 1
    }
};