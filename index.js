const routemod = require('./class/routehandler.js');
const signup = require('./api/signup.js');

const routes = [
    signup.signuproute
];

routemod.routeconn(routemod.routeopt, routes);