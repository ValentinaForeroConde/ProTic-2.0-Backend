import mongoose from 'mongoose';
import { ProjectModel } from "../proyectos/proyecto.js";
import { UserModel } from "../usuarios/usuario.js";

const {Schema, model, db} = mongoose;
const inscripcionSchema = new Schema({
    fechaIngreso:{
        type:Date,
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
    estado: {
        type: String,
        enum: ["ACEPTADA", "RECHAZADA", "PENDIENTE"],
        default: "PENDIENTE",
    },

});


const InscripcionModel = model('Inscripcion', inscripcionSchema);
export{InscripcionModel}