const http         = require('http');
const Router       = require('router');
const finalhandler = require('finalhandler')
const bodyParser   = require('body-parser');

exports.routeconn = (routearr)=>{

  let router = Router()

  router.use(bodyParser.json())

  for (i=0;i<routearr.length;i++){

    let routearrnow = routearr[i];

    router[routearrnow.method](routearrnow.path, routearrnow.func);

  }
    
    var server = http.createServer(function(req, res) {
      router(req, res, finalhandler(req, res));
    });
    
    server.listen(3000);

};