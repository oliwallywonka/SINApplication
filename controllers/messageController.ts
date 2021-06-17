import { Request,Response } from "express"

import Message, { IMessage } from "../models/message"
export const getMessages = async (req:Request,res:Response) => {
    try {
        const messages = await Message.find();

        return res.status(200).json({messages});
    } catch (error) {
        res.status(500).json({message:"server Error"})
    }
}
export const createMessage = async(req:Request,res:Response) => {

    const {message} = <IMessage>req.body;

    try {
        const newMessage = new Message({
            message:message
        });
        //await newMessage.save();
        return res.status(201).json({newMessage});
    } catch (error) {
        res.status(500).send('server error')
    }
}

export const updateMessage = async(req:Request,res:Response) => {
    const {message} = <IMessage>req.body;
    const messageId = req.params.id;
    const newMessage = new Message({
        _id:messageId,
    });
    newMessage.message = message;
    try {
        let updatedMessage = await Message.findById(messageId);
        if(!updatedMessage){
            return res.status(404).json({msg:'Mensaje no encontrado not found'});
        }
        updatedMessage = await Message.findByIdAndUpdate(
            {_id: messageId},
            {$set: newMessage},
            {new:true}
        );
        return res.status(202).json({updatedMessage});
    } catch (error) {
        res.status(500).send('server error')
    }
}

export const eliminateMessage = async (req:Request,res:Response) => {

    const messageId = req.params.id;
    try {
        let message = await Message.findById(messageId);
        if(!message) return res.status(404).json({msg:'brand not found'});

        await Message.findByIdAndDelete(messageId)
        return res.status(200).json({msg:'Mensaje eliminado'});
    } catch (error) {
        res.status(500).send('server error');
    }
}
