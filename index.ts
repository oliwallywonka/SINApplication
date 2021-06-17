import dotenv from 'dotenv';
import Server from './models/server';

dotenv.config({
    path: '.env'
});

const server = Server.instance;

const connect = async() => {

    await server.whatsapp.connect()
}
server.listen();

/*server.whatsapp.on('qr',(qr)=>{
    server.io.emit('qr',qr);
    console.log(qr)
})

server.whatsapp.on('contacts-received', () => {
    server.io.emit('status',{
        status:'connected'
    });
})

connect();

server.whatsapp.on('close', () => {
    server.io.emit('status',{
        status:'disconnected'
    });
})

server.whatsapp.on('loguot', () => {
    server.io.emit('status',{
        status:'disconnected'
    });
})*/
