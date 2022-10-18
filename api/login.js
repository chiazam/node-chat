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

            let userresult = {};

            (() => {

                return new Promise((resolve, reject) => {

                    conn.query('SELECT * FROM _users WHERE _user = ?', [body.user], (err, results, fields) => {

                        if (rows === undefined) {
                            reject(new Error("Error rows is undefined"));
                        } else {
                            resolve(results);
                        }

                    });

                })

            })()



            return { succ: "Login Successfully", user: userresult };

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