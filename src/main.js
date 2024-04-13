import express from 'express'
import { PORT } from './config.js';
import { Server } from 'socket.io';
import { mensajeManager } from './services/mensajeManager.js';

const app = express()

const server = app.listen(PORT, ()=>{console.log(`conectado a puerto: ${PORT}`);})

const io = new Server(server)

app.use(express.static('./views'))
app.use('/static',express.static('./static'))



io.on('connection',async(socket)=>{
    //socket.emit('mensaje', 'AMERICA YA :D')
    socket.emit('mensajes', await mensajeManager.obtenerTodos())

    socket.broadcast.emit('nuevoUsuario', socket.handshake.auth.username)

    socket.on('mensaje', async msg=>{
        console.log(msg);
        await mensajeManager.agregar(msg)
        io.sockets.emit('mensajes', await mensajeManager.obtenerTodos())
    })
})