const routemod = require('../class/routehandler.js');
const filemod = require('../class/filehandler.js');
const base64mod = require('../class/base64.js');
const mysqlmod = require('../class/mysqlhandler.js');
const timemod = require('../class/timehandler.js');

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

        let conn = mysqlmod.mysqlconn();

        conn.connect((err => {

            if (err) {

                console.error('error connecting: ' + err.stack);
                return;

            }

            console.log('connected as id ' + conn.threadId);

        }));

        let file = (files.length === 0) ? ('') : (files[0].path);

        let word = (body.message.length === 0) ? ('') : (body.message);

        let chatsave = await mysqlmod.mysqlquery('INSERT INTO _chats SET ?', {

            _word: word,
            _file: file,
            _senduser: user,
            _recieveuser: body.recip,
            _date: timemod.now()

        }, conn);

        if (chatsave == false) {

            return { err: "Message not sent, try again!" };

        }

        try {

            let message = (await mysqlmod.mysqlquery('SELECT * FROM _chats WHERE id = ?', [chatsave.result.insertId], conn)).result;

            conn.end((err => {}));

            return { succ: "Message sent successfully!", message: message };

        } catch (error) {

            console.log(error);

            return { err: "Message not sent, try again!" };

        }

    } else {

        return { err: "Permission Denied!" };

    }

};

const addchatfunc = async function(req, res) {

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