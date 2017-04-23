var http = require('http');

//Crea el servidor al que accederá en cada petición
http.createServer(function(request, response) { //Dos argumentos
  //Se puede acceder a los elementos de la peticion:
  var headers = request.headers; //Siempre en minusculas
  //var userAgent = headers['user-agent']
  var method = request.method;
  var url = request.url; //URL sin servidor, protocolo o puerto
  var body = []; //Cuerpo más dificil que headers (ReadableStream)
  //Cada trozo de "data event" es un buffer
  //Se comprueba la petición que puede ser un error o contener datos
  request.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) { //Se meten los datos en un array y se concatenan al final
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
    // BEGINNING OF NEW STUFF = RESPUESTA
    //response(WriteableStream-ServerResponse)

    response.on('error', function(err) {
      console.error(err);
    });

    response.statusCode = 200; //Modifica estado
    //Establecer cabeceras de respuesta
    response.setHeader('Content-Type', 'application/json'); //Pueden hber más cabeceras
    // Se pueden sustitur por:
    // response.writeHead(200, {'Content-Type': 'application/json'})

    var responseBody = {
      headers: headers,
      method: method,
      url: url,
      body: body
    };

    response.write(JSON.stringify(responseBody));
    response.end(); //Se termina de escribir
    //Se pueden sustituir por:
    // response.end(JSON.stringify(responseBody))

    // END OF NEW STUFF
  });
}).listen(8080); //El servidor escucha en el puerto 80
