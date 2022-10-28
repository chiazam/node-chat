const routemod = require('../class/routehandler.js');
const passhash = require('password-hash');
const mysqlmod = require('../class/mysqlhandler.js');
const base64mod = require('../class/base64.js');



const socfunc = async function(req, res) {

    // res.statusCode = 200;
    // console.log(req.body);
    // console.log(req.params);

    req.params = routemod.routequery(req).query;
    res.setHeader('Content-Type', 'text/html');

    res.end(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Socket.io simple chat</title>
      </head>
      <body>
        <div class="container">
          <div class="inbox">
            <div class="inbox__people">
              <h4>Active users</h4>
            </div>
            <div class="inbox__messages">
              <div class="messages__history"></div>
              <div class="fallback"></div>
            </div>
          </div>
    
          <form class="message_form">
            <input type="text" class="message_form__input" placeholder="Type a message" />
            <button class="message_form__button" type="submit">
              Enter
            </button>
          </form>
        </div>
    
        <script src="/socket.io/socket.io.js"></script>
        <script>
  const socket = io();
</script>
      </body>
    </html>`);

};

exports.socroute = {
    method: 'get',
    path: "/",
    func: socfunc
};