import {model,Schema,Document} from 'mongoose';

export interface IPhone extends Document{
    phone:string;
    status:boolean
}

const phoneSchema = new Schema<IPhone>({
    phone:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
    },
    status:{
        type:Boolean,
        default:true
    }
})
export default model('Phone',phoneSchema);