const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Evitar solicitud de favicon.ico
  if (req.url === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Manejo especial: envío del formulario de contacto
  if (req.method === 'POST' && req.url === '/contacto') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const datos = querystring.parse(body);
      console.log('Nuevo mensaje de contacto recibido:', datos);

      res.writeHead(302, { Location: '/confirmacion.html' });
      res.end();
    });
    return;
  }

  let urlPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(__dirname, 'public', urlPath);

  console.log('Ruta del archivo solicitado:', filePath);

  fs.stat(filePath, (err, stats) => {
    if (err || stats.isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Página no encontrada</h1>');
      return;
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        console.error('Error al leer el archivo:', err);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('Error del servidor');
      } else {
        const ext = path.extname(filePath);
        let contentType = 'text/html';
        switch (ext) {
          case '.js':
            contentType = 'text/javascript';
            break;
          case '.css':
            contentType = 'text/css';
            break;
          case '.json':
            contentType = 'application/json';
            break;
          case '.png':
            contentType = 'image/png';
            break;
          case '.jpg':
            contentType = 'image/jpeg';
            break;
        }

        console.log('Sirviendo archivo:', filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});