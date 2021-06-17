import { Request,Response } from "express"

import Phone, { IPhone } from "../models/phone"
export const getPhones = async (req:Request,res:Response) => {
    try {
        const phones = await Phone.find();

        return res.status(200).json({phones});
    } catch (error) {
        res.status(500).json({message:"server Error"})
    }
}

export const createPhone = async(req:Request,res:Response) => {
    const {phone} = <IPhone>req.body
    try {
        const newPhone = new Phone({
            phone:phone
        });
        await newPhone.save();
        return res.status(201).json({newPhone});
    } catch (error) {
        res.status(500).send('server error')
    }
}

export const updatePhone = async(req:Request,res:Response) => {
    const {phone} = <IPhone>req.body;
    const phoneId = req.params.id;

    const newPhone = new Phone({
        _id:phoneId,
        phone:phone
    });
    

    try {
        let updatedPhone = await Phone.findById(phoneId);
        if(!updatedPhone){
            return res.status(404).json({msg:'Brand not found'});
        }

        updatedPhone = await Phone.findByIdAndUpdate(
            {_id: phoneId},
            {$set: newPhone},
            {new:true}
        );

        return res.status(202).json({updatedPhone});

    } catch (error) {
        res.status(500).send('server error')
    }
}

export const desactivatePhone = async (req:Request,res:Response) => {

    const phoneId = req.params.id;
    try {
        let phone = await Phone.findById(phoneId);
        if(!phone) return res.status(404).json({msg:'brand not found'});

        await Phone.findByIdAndUpdate(
            {_id:phoneId},
            {status:false}
        );
        return res.status(200).json({msg:'Telefono desactivated'});
    } catch (error) {
        res.status(500).send('server error');
    }
}

export const activatePhone = async (req:Request,res:Response) => {

    const phoneId = req.params.id;
    try {
        let phone = await Phone.findById(phoneId);
        if(!phone) return res.status(404).json({msg:'brand not found'});

        await Phone.findByIdAndUpdate(
            {_id:phoneId},
            {status:true}
        );
        return res.status(200).json({msg:'Telefono activated'});
    } catch (error) {
        res.status(500).send('server error');
    }
}
