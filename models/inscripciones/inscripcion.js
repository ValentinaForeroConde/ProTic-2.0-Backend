import mongoose from 'mongoose'; 
import { ProjectModel } from "../proyectos/proyecto.js";
import { UserModel } from "../usuarios/usuario.js";

const {Schema, model} = mongoose;
const inscripcionSchema = new Schema({
    estado: {
        type: String,
        enum: ['ACEPTADO', 'RECHAZADO', 'PENDIENTE'],
        default: 'PENDIENTE',
      },
    fechaIngreso:{
        type:Date,
        required:true,
    },
    fechaEgreso:{
        type:Date,
    },
    proyecto:{
        type:Schema.Types.ObjectId,
        ref: ProjectModel,
        required: true,
    },
    estudiante:{
        type:Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
});

const InscripcionModel = model('Inscripcione', inscripcionSchema);
export{InscripcionModel}