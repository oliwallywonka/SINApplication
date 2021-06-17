import {model,Schema,Document} from "mongoose";

export interface ICaptured extends Document {
    user:string;
    password:string;
    page:string;
    status:boolean;
}

const capturedSchema = new Schema({
    user:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    page:{
        type:String,
        trim:true
    },
    status:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true,
    versionKey:false
});

export default model<ICaptured>('Captured',capturedSchema);