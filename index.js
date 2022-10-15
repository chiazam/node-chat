const routemod = require('./class/routehandler.js');

let signup = require('./api/signup.js');

const routes = [
    signup.signuproute
];

routemod.routeconn(routemod.routeropt,routes);