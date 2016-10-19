// cargando modulo http
var http = require('http');
//Cargar la libreria colores
var colors = require('colors');
//Generando un tema
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});
//obteniendo configuraciones
var config = require("./config/config");

//console.log(`> contenido del modulo= ${modulo}`)
var IP = config.IP;
var PORT = config.PORT;
// Creando el server
var server = http.createServer(function(req,res){
    res.writeHead(
        200,{
            'Content-Type':'text/plain',
            'server':'Buho@0.0.0'
        }
    );

res.write('Hola desde el server...');
res.end();
});
// Poniendo a escuchar al server
server.listen(PORT, IP, function(){ 
    console.log("> server escuchando en ".info+`http://${IP}:${PORT}/ ...`.info);
});