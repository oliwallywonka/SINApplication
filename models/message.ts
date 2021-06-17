import {model,Schema,Document} from "mongoose";

export interface IMessage extends Document {
    message:string;
    status:boolean
}

const messageSchema = new Schema({
    message:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true,
    versionKey:false
});

export default model<IMessage>('Message',messageSchema);