const routemod = require('./class/routehandler.js');

const routes = [{
    method:'get',
    path:"/",
    func:(req, res) => {

        // console.log(req);

        res.statusCode = 200;

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');

        res.end('Hello World! \n');
    
    }
}];

routemod.routeconn(routes);