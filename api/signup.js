routemod = require('../class/routehandler.js');

const signupfunc = (req, res) => {

    
    // res.statusCode = 200;
    // console.log(req.body);
    // console.log(req.params);

    req.params = routemod.routequery(req).query;

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify([req.body,req.params,req.files]));

};

exports.signuproute = {
    method:'post',
    path:"/api/signup/",
    func:signupfunc,
    uploads:{
        name:"pix",
        num:1
    }
};