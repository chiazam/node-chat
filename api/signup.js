const passhash = require('password-hash');
const routemod = require('../class/routehandler.js');
const filemod = require('../class/filehandler.js');

const signupnow = (body, files) => {

    if (body.name != undefined && body.user != undefined && body.pass != undefined) {

        if (body.name.length === 0) {

            return { err: "Input your Fullname!" };

        } else if (body.user.length === 0) {

            return { err: "Input your Username!" };

        } else if (body.pass.length === 0) {

            return { err: "Input your Password!" };

        } else if (files.length === 0) {

            return { err: "Input your Picture!" };

        } else {

            // passwordHash.verify('password123', hashedPassword)

            var hash = passhash.generate('password123');

            return { succ: "", hash: hash };

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

    if (api.err != undefined) {

        for (let i = 0; i < req.files.length; i++) {

            const filenow = req.files[i];

            filemod.filehandledel(filenow.path);

        }

    }

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