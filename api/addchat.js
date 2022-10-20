const routemod = require('../class/routehandler.js');
const filemod = require('../class/filehandler.js');
const base64mod = require('../class/base64.js');
const mysqlmod = require('../class/mysqlhandler.js');

let addchatnow = async function(body, files) {

    if (body.logid != undefined && body.recip != undefined && body.message != undefined) {

        if (body.logid.length === 0) {

            return { err: "Input your Logid!" };

        } else if (body.recip.length === 0) {

            return { err: "Input your Recipient Username!" };

        } else if (body.message.length === 0 && files.length === 0) {

            return { err: "Input your Message or Input your Picture!" };

        }

        let user = base64mod.frombase64(body.logid);

        if (user == body.recip) {

            return { err: "You cant be your Recipient!" };

        }

        return { err: user };

        // try {



        // } catch (error) {

        //     console.log(error);

        //     return { err: "Chat not sent!" };

        // }

    } else {

        return { err: "Permission Denied!" };

    }

};

const addchatfunc = async function(req, res) {

    // res.statusCode = 200;
    // console.log(req.body);
    // console.log(req.params);

    req.params = routemod.routequery(req).query;
    res.setHeader('Content-Type', 'application/json');

    let api = await addchatnow(req.body, req.files);

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

exports.addchatroute = {
    method: 'post',
    path: "/api/addchat/",
    func: addchatfunc,
    uploads: {
        name: "pix",
        num: 1
    }
};