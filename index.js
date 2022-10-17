const routemod = require('./class/routehandler.js');
const signup = require('./api/signup.js');
const login = require('./api/login.js');

const routes = [

    signup.signuproute,
    login.loginroute

];

routemod.routeconn(routemod.routeopt, routes);