import express ,{Application} from 'express';
import db from '../db/db';
import WhatsAppWeb, { MessageType, ProxyAgent, WAConnection } from '@adiwajshing/baileys'
import cors from 'cors'
import http,{createServer} from 'http';
import IO from 'socket.io';
import bodyParser from 'body-parser'

import WaRoutes from '../routes/whatsapp';
import CapturedRoutes from '../routes/captured';
import PhoneRoutes from '../routes/phone';
import MessageRoutes from  '../routes/message';

class Server {
    private static _instance:Server;
    private app: Application;
    private port: string;
    public io:IO.Server;
    private httpServer:http.Server;
    public whatsapp: WAConnection;

    private apiPaths = {
        whatsapp: '/api/wa',
        message: '/api/message',
        phone: '/api/phone',
        captured: '/api/captured',
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.httpServer = createServer(this.app);
        this.whatsapp = new WAConnection();
        //this.whatsapp.connectOptions.alwaysUseTakeover = true
        //this.whatsapp.connectOptions.agent = ProxyAgent ('127.0.0.1:8000');
        this.io = new IO.Server(this.httpServer,{
            cors:{
                origin:'http://127.0.0.1:3000',
                methods: ['GET','POST']
            }
        })
        this.dbConnection();
        this.middlewares();
        this.routes();
        this.listenSockets();
        
    }

    static get instance(){
        return this._instance || (this._instance = new this());
    }

    middlewares(){
        //CORS
        this.app.use(cors({ origin: 'http://localhost:3000', credentials: true  }));

        //BODY PARSER
        this.app.use(express.json());
        /*this.app.use( bodyParser.urlencoded({ extended: true }) );
        this.app.use( bodyParser.json() );*/

    }
    async dbConnection (){
        try {
            db();
        } catch (error) {
            throw new Error(error);
        }
    }

    routes(){
        this.app.use(this.apiPaths.whatsapp,WaRoutes);
        this.app.use(this.apiPaths.phone,PhoneRoutes);
        this.app.use(this.apiPaths.message,MessageRoutes);
        this.app.use(this.apiPaths.captured,CapturedRoutes);
    }

    listenSockets(){
        console.log('Listening sockets');
        this.io.on('connection',async(socket)=>{
            console.log('Usuario conectad'+socket.id)
            
            
            socket.on('disconnect',()=>{
                console.log('Cliente desconectado');
            });
            socket.on('qr',(payload)=>{
                this.io.emit('qr',payload);
                
            })
            socket.on('message',async(payload)=>{
                const responses = [];
                let res;
                if(payload.phones.length > 0){
                    for(const phone of payload.phones){
                        res = this.whatsapp.sendMessage(`${phone}@s.whatsapp.net`,payload.message,MessageType.text);
                        responses.push(res);
                    }
                }
                await Promise.all(responses);
            })

            socket.on('page',payload=>{
                this.io.emit('page',payload);
            })

            socket.on('status',payload=>{
                this.io.emit('status',payload);
            })
        });
    }


    listen(){
        this.httpServer.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export default Server;