const passhash = require('password-hash');
// const routemod = require('../class/routehandler.js');
const mysqlmod = require('../class/mysqlhandler');

const loginnow = async function(body) {

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

                return new Promise(((resolve, reject) => {

                    conn.query('SELECT * FROM _users WHERE _user = ?', [body.user], (err, results, fields) => {

                        if (err) {

                            reject(false);

                        } else {

                            resolve(results);

                        }

                    });

                }));

            });

            let rendlogtoapi = (results) => {

                return new Promise(((resolve, reject) => {

                    if (results != false) {

                        resolve({ user_result: results, succ_err: true });

                    } else {

                        reject(false);

                    }
                }));

            };

            let foldusersql = (usersql) => {

                return new Promise(((resolve, reject) => {

                    if (usersql != false) {

                        resolve({ succ: "Login Successful!", login: usersql.user_result });

                    } else {

                        reject(false);

                    }

                }));

            };

            let finalenroll = (logininfo) => {

                return new Promise(((resolve, reject) => {

                    console.log(logininfo != false);

                    if (logininfo != false) {

                        console.log(passhash.verify(body.pass, logininfo.login[0]._pass), body.pass, logininfo.login._pass);

                        if (passhash.verify(body.pass, logininfo.login[0]._pass)) {

                            logininfo.login[0]._pass = undefined;

                            resolve(logininfo);

                        } else {

                            resolve({ err: "Login failed, incorrect Password..." });

                        }

                    }

                    // else {



                    // }

                }));

            }

            try {

                return await finalenroll(await foldusersql(await rendlogtoapi(await get_user())));

            } catch (error) {

                console.log(error);

                return { err: "Login failed, incorrect Username..." };

            }

        }

    } else {

        return { err: "Permission Denied!" };

    }

};

const loginfunc = async function(req, res) {

    // res.statusCode = 200;
    // console.log(req.body);
    // console.log(req.params);
    // req.params = routemod.routequery(req).query;

    res.setHeader('Content-Type', 'application/json');

    let api = await loginnow(req.body);

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