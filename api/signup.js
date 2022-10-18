const passhash = require('password-hash');
const routemod = require('../class/routehandler.js');
const filemod = require('../class/filehandler.js');
const mysqlmod = require('../class/mysqlhandler');

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

            conn.query('INSERT INTO _users SET ?', {

                _name: body.name,
                _user: body.user,
                _pass: hash,
                _pix: files[0].path

            }, (error, results, fields) => {
                if (error) throw error;
                console.log(results.insertId);
            });

            conn.end((err => {}));

            return { succ: "Account Created Successfully" };

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