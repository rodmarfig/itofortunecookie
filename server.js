// Cargando el modulo http
var http = require('http');
// Cargando libreri path
var path = require('path');
// Cargando la libreria colors
var colors = require('colors');
var fs = require('fs');
// Generando un tema
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: ['yellow', 'bgWhite'],
  debug: 'blue',
  error: 'red',
  achivement: 'rainbow'
});
// Obteniendo configruaciones
var config = require('./config/config');
var IP = config.IP;
var PORT = config.PORT;
var counter = 0;
// Creando el server
var server = http.createServer(function(req,res){
    var urlPath = req.url;
    //console.log(`> URL solicitada: ${urlPath}`.silly);
    if(urlPath == '/'){
        // Genera una ruta hacia el index.html
        urlPath = path.resolve('./static/index.html');
    }else{
        // Genera una ruta dentro de static
        urlPath = 
        path.resolve(config.STATIC_PATH + urlPath);        
    }
    // Extrayendo la extencion de lo que vamos a servir
    var extname = path.extname(urlPath);
    // Seleccionar el contet-type con base en el extname
    var contentType = 'text/plain';
    switch(extname){
        case '.html':
            contentType = 'text/html'
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css'
    };
    fs.exists(urlPath,function(exists){
        if(!exists){
            // No  existe
            res.writeHead(404,{
                'Content-Type':'text/html'
            });
            res.end('<h1>404 NOT FOUND... :(</h1>');
        }else{
            // Si existe
            //Leer archivo y servirlo
            fs.readFile(urlPath, function(err, content){
                if(err){
                    res.writeHead(500, {
                        'contentType':'text/html'
                    });
                    res.end('<h1> style="color:red>500 error</h1>"');
                }else{
                    //Si pudo leer el archivo!!
                    res.writeHead(200,{
                        'contentType': contentType
                    });
                    res.end(content);
                }    
            });
            //res.end(`${urlPath} existe`);
        }
    });
});
// Poniendo a escuchar
// al server
server.listen(PORT,IP,function(){
    console.log("> Server escuchando en ".info +
    `http://${IP}:${PORT}/ ...`.info);
});
