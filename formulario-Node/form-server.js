//Imports
var http = require('http');
var path = require('path');
var fs = require('fs'); // sistema de archivo

http.createServer(function(request, response) {
  var headers = request.headers;
  var url = request.url;
  var ruta = '.' + ((request.url=='/') ? '/index.html' : request.url); //si la ruta esta vacia carga index.html
	var extension = path.extname(ruta); // obtiene la extension del archivo

  var contentType;
  switch (extension) {
    case '.html':
			ContentType = 'text/html';
			break;
		case '.css':
			ContentType = "text/css";
			break;
		case '.png':
			ContentType = "image/png"
			break;
    case '.jpg':
			ContentType = "image/jpg"
			break;
		case '.mp4':
			ContentType = "video/mp4";
			break;
		default:
			ContentType = 'text/html';
  }

  if (request.method == "GET"){
    showContent(ruta,ContentType,response,request);
  }else if(request.method == "POST"){
    processForm(response,request,"POST"); //El formulario llega por post
  }

}).listen(8080);


function showContent(ruta,ContentType,response,request){
  //Comprobamos si el recurso solicitado existe
  fs.exists(ruta,function(exist){
    //Si existe se devuelve
		if (exist){
			fs.readFile(ruta,function(error,content){ //Parametros: archivo a leer y callback
				if (error){
					response.statusCode = 500;
					response.setHeader('Content-Type','text/plain');
					response.write("error interno");
					response.end();

				}else{
					response.writeHead(200,{
						'content-type' : ContentType
					});
          //La funcion readFile devuelve el contenido en content
					response.write(content);
					response.end();
				}
			});
		}else{
      //Si no existe error 404
			response.statusCode = 404;
			response.setHeader('Content-Type','text/plain');
			response.write('Content not found');
			response.end();
		}

		});
}

function processForm(response,request,method){
	var body = []
  var responseBody = []
  request.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) { //Se meten los datos en un array y se concatenan al final
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();

    var str = body.split('&');
    for (i=0; i<str.length ; i++){
      var campo = str[i].split('=');
      responseBody = responseBody + campo[0] + ' = ' + campo[1]+ '\n';
    }
    response.writeHead(200,{
      'content-type' : 'text/plain'
    });
    response.end(responseBody);
    console.log(responseBody)
  });



}
