require('dotenv').config()
const http = require('http')

function requestController(req, res) {
    console.log('Bienvenidos al curso')
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end('<h1>Bienvenidos al curso del profesor USNAYO</h1><p>Aplicación desplegada en Render  y muchas cosas mas ... </p>')
}

const server = http.createServer(requestController)

const PORT = process.env.PORT || 4000

server.listen(PORT, function () {
    console.log("Aplicacion corriendo en: " + PORT)
})