const passhash = require('password-hash');
// const routemod = require('../class/routehandler.js');
const mysqlmod = require('../class/mysqlhandler');

const loginnow = (body) => {

    if (body.user != undefined && body.pass != undefined) {

        if (body.user.length === 0) {

            return { err: "Input your Username!" };

        } else if (body.pass.length === 0) {

            return { err: "Input your Password!" };

        } else {

            // passwordHash.verify(body.pass, hashedPassword)

            let conn = mysqlmod.mysqlconn();

            conn.connect((err => {

                if (err) {

                    console.error('error connecting: ' + err.stack);
                    return;

                }

                console.log('connected as id ' + conn.threadId);

            }));

            let get_user = (() => {

                return new Promise((resolve, reject) => {

                    conn.query('SELECT * FROM _users WHERE _user = ?', [body.user], (err, results, fields) => {

                        if (err) {

                            reject(new Error(err));

                        } else {

                            resolve(results);

                        }

                    });

                });

            });

            get_user().then((results) => {

                rendlogtoapi(results);

            }).catch((err) => {

                rendlogtoapi(false);

            });

            let userresult = undefined;

            let succ_err = true;

            rendlogtoapi = (results) => {

                console.log(results);

                if (results != false) {

                    userresult = results;

                } else {

                    succ_err = false;

                }

            };

            if (succ_err == true) {

                return { succ: "Login Successful!", login: userresult };

            } else {

                return { err: "Login failed, try again later..." };

            }

        }

    } else {

        return { err: "Permission Denied!" };

    }

};

const loginfunc = (req, res) => {

    // res.statusCode = 200;
    // console.log(req.body);
    // console.log(req.params);
    // req.params = routemod.routequery(req).query;

    res.setHeader('Content-Type', 'application/json');

    let api = loginnow(req.body);

    res.end(JSON.stringify({
        api: api,
        req: [req.body, req.params]
    }));

};

exports.loginroute = {
    method: 'post',
    path: "/api/login/",
    func: loginfunc
};