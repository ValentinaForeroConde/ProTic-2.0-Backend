import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const userSchema = new Schema({
    correo:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    identificacion:{
        type:String,
        required:true,
        unique:true
    },
    nombre:{
        type:String,
        required:true,
    },
    apellido:{
        type:String,
        required:true,
    },
    rol:{
        type:String,
        required:true,
        enum: ["ESTUDIANTE","LIDER","ADMINISTRADOR"],
    },
    estado:{
        type: String,
        enum: ["AUTORIZADO","PENDIENTE","NO_AUTORIZADO"],
        default: "PENDIENTE",
    }
});

userSchema.virtual("avances",{
    ref:'Avance',
    localField:"_id",
    foreignField: "usuario",
},
{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
})
userSchema.virtual("inscripciones",{
    ref:'Inscripcione',
    localField:"_id",
    foreignField: "usuario",
},
{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
})

const UserModel = model('User', userSchema);
export {UserModel};