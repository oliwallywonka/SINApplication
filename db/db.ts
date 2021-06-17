import mongoose from 'mongoose'

export default () => {
    const connect = () =>{
        const db = process.env.DB_MONGO || "";
        mongoose
            .connect(db,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
            .then(()=>{
                return console.log(`Successsfully connected to ${db}`);
            })
            .catch(error =>{
                console.log(`Error connecting to database: ${error}`);
                return process.exit(1);
            })
    };
    connect();

    mongoose.connection.on("diconnected", connect);
}