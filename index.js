const routemod = require('./class/routehandler.js');
const signup = require('./api/signup.js');
const login = require('./api/login.js');
const addchat = require('./api/addchat.js');
const searchuser = require('./api/searchuser.js');

const routes = [

    signup.signuproute,
    login.loginroute,
    addchat.addchatroute,
    searchuser.searchuserroute

];

routemod.routeconn(routemod.routeopt, routes);