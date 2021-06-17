import {model,Schema,Document,Types, Query} from "mongoose"
import bcrypt ,{compare}from "bcryptjs"

export interface IUser extends Document{
    email:string,
    password:string,
    comparePassword: (password:string,changedPassword:string) => Promise<boolean>

}

const userSchema = new Schema<IUser>({
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
},{
    timestamps:true,
    versionKey:false
});

userSchema.pre('save', async function(next):Promise<void>{
    const user = this;
    if(user.isModified('password')) {

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password,salt);
        user.password = hash;
        next();
    }
});

userSchema.methods.comparePassword = async function (password:string,recivedPassword:string):Promise<boolean>{
    return await compare(password,recivedPassword);
}

export default model('User',userSchema);