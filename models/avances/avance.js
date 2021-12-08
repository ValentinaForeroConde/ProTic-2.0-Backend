import mongoose from 'mongoose';
import { ProjectModel } from "../proyectos/proyecto.js";
import { UserModel } from "../usuarios/usuario.js";

const {Schema, model} = mongoose;
const advancementSchema = new Schema({
    fecha:{
        type:Date,
        required:true,
    },
    descripcion:{
        type:String,
        required:true,
    },
    observaciones:[
        {
            type:String,
        }
    ],
    proyecto:{
        type:Schema.Types.ObjectId,
        ref: ProjectModel,
        required: true,
    },
    creadoPor:{
        type:Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    }
});

const AdvancementModel = model('Avance', advancementSchema);
export{AdvancementModel}