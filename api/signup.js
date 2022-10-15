

const signupfunc = (req, res) => {

    // PMAK-6349eded4c38d627f47429a2-4b7fb0897e89baaa566414a2fbf3a9be58
    // res.statusCode = 200;
    // console.log(req.body);
    // console.log(req.params);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify([req.body,req.params,req.files]));

};

exports.signuproute = {
    method:'post',
    path:"/api/signup",
    func:signupfunc,
    uploads:{
        name:"pix",
        num:1
    }
};