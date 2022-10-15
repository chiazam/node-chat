const http         = require('http');
const Router       = require('router');
var compression  = require('compression');
const finalhandler = require('finalhandler')
const bodyParser   = require('body-parser');
const multer  = require('multer');
const storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, './files');    
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  }
});
const formdata = multer({
  storage: storage,
  limits : {fileSize : 10000000},
  fileFilter:(req, file, cb) => {    
    // Allowed ext
     const filetypes = /jpeg|jpg|png|jiff|gif/;
   // Check ext
    const extname =  filetypes.test(file.originalname.toLowerCase());
   // Check mime
   const mimetype = filetypes.test(file.mimetype);
  
   if(mimetype && extname){
       return cb(null,true);
   } else {
       cb('Error: Images Only!');
   }
  }
});

exports.routeropt = {mergeParams: true};

exports.routeconn = (routeopt,routearr)=>{

  let router = Router(routeopt);

  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(compression());

  for (i=0;i<routearr.length;i++){

    let routearrnow = routearr[i];

    if(routearrnow.hasOwnProperty('uploads')){

      router[routearrnow.method](routearrnow.path,formdata.array(routearrnow.uploads.name,routearrnow.uploads.num), routearrnow.func);

    }else{

    router[routearrnow.method](routearrnow.path, routearrnow.func);

    }

  }
    
    var server = http.createServer(function(req, res) {
      router(req, res, finalhandler(req, res));
    });
    
    server.listen(3000);

};