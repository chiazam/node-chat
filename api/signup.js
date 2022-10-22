const passhash = require('password-hash');
const routemod = require('../class/routehandler.js');
const filemod = require('../class/filehandler.js');
const mysqlmod = require('../class/mysqlhandler.js');
const timemod = require('../class/timehandler.js');

const signupnow = async function(body, files) {

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

            // passwordHash.verify(body.pass, hashedPassword)

            let conn = mysqlmod.mysqlconn();

            var hash = passhash.generate(body.pass);

            conn.connect((err => {

                if (err) {

                    console.error('error connecting: ' + err.stack);
                    return;

                }

                console.log('connected as id ' + conn.threadId);

            }));

            let signup = await mysqlmod.mysqlquery('INSERT INTO _users SET ?', {

                _name: body.name,
                _user: body.user,
                _pass: hash,
                _pix: files[0].path,
                _date: timemod.now()

            }, conn);

            conn.end((err => {}));

            if (signup != false) {

                return { succ: "Account Created Successfully!" };

            } else {

                return { err: "Sign up failed, try again!" };

            }

        }

    } else {

        return { err: "Permission Denied!" };

    }

};

const signupfunc = async function(req, res) {

    req.params = routemod.routequery(req).query;
    res.setHeader('Content-Type', 'application/json');

    let api = await signupnow(req.body, req.files);

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