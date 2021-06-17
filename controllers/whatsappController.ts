import Server from '../models/server';
import {ReconnectMode} from '@adiwajshing/baileys'
import {Request,Response} from 'express'
import {MessageType} from '@adiwajshing/baileys'


export const whatsappConnect = async(req:Request,res:Response) =>{
    try {
        await Server.instance.whatsapp.connect()
        return res.json('gaaa')
    } catch (error) {
        console.log(error);
        res.json('server error')
    }
}

export const whatsappMessage = async (req:Request,res:Response) =>{
    try {
        const options ={
            quoted: null,
            timestamp: new Date()
        }
        console.log(req.body);
        const {phone,message} = req.body;
        await Server.instance.whatsapp.sendMessage(`${phone}@s.whatsapp.net`,message,MessageType.text);
        return res.json({msg:'message enviado'})
    } catch (error) {
        console.log(error);
    }
}

export const getQR = async(req:Request,res:Response) => {
    try {
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Server Error'});
    }
}