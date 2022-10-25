const routemod = require('../class/routehandler.js');
const mysqlmod = require('../class/mysqlhandler.js');
const base64mod = require('../class/base64.js');

const searchusernow = async function(params) {

    let limit =10;

    let offset = 0;

    if (params.logid != undefined&&params.word != undefined) {

        if (params.logid.length === 0) {

            return { err: "Input your Logid!" };

        } else if (params.word.length === 0) {

            return { err: "Input your Word!" };

        } else if (params.word.length === 0) {

            return { err: "Input your Word!" };

        } else {

            let conn = mysqlmod.mysqlconn();

            conn.connect((err => {

                if (err) {

                    console.error('error connecting: ' + err.stack);
                    return;

                }

                console.log('connected as id ' + conn.threadId);

            }));

            

        let user = base64mod.frombase64(params.logid);
        
        if (params.limit != undefined &&params.limit.length != 10) {

            limit= params.limit.length;

        }
        
        if (params.offset != undefined &&params.offset != 0) {

            offset= params.offset.length;

        }

        try {

        let searchusers = (await mysqlmod.mysqlquery('SELECT * FROM _users WHERE _user LIKE ? LIMIT ? OFFSET ?', [`%${params.word}%`,limit,offset], conn)).result;

            conn.end((err => {}));

            return { succ: "Users search successful!", users: searchusers };

        } catch (error) {

            console.log(error);

            return { err: "Users search failed!, try again!" };

        }

        }


    }

}



const searchuserfunc = async function(req, res) {

    // res.statusCode = 200;
    // console.log(req.body);
    // console.log(req.params);

    req.params = routemod.routequery(req).query;
    
    res.setHeader('Content-Type', 'application/json');

    let api = await searchusernow(req.params);

    res.end(JSON.stringify({
        api: api,
        req: [req.body, req.params]
    }));

};

exports.searchuserroute = {
    method: 'get',
    path: "/api/searchuser/",
    func: searchuserfunc
};