import mongoose from 'mongoose';
import { UserModel } from '../usuarios/usuario.js';

const {Schema, model} = mongoose;
const projectSchema = new Schema({
    nombre: {
        type:String,
        requiered: true,
    },
    presupuesto:{
        type: Number,
        requiered: true,
    },
    fechaInicio: {
        type: Date,
        requiered: true,
    },
    fechaFin: {
        type: Date,
        requiered: true,
    },
    estado: {
        type:String,
        enum: ["ACTIVO","INACTIVO"],
        default: "INACTIVO",
    },
    fase: {
        type:String,
        enum: ["INICIADO","DESARROLLO","TERMINADO","NULO"],
        default: "NULO",
    },
    lider: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: UserModel,
    },
    objetivos: [
        {
          descripcion: {
            type: String,
            required: true,
          },
          tipo: {
            type: String,
            enum: ["GENERAL","ESPECIFICO"],
            required: true,
          },
        },
      ],
});
projectSchema.virtual("avances",{
    ref:'Avance',
    localField:"_id",
    foreignField: "proyecto",
},
{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
})
projectSchema.virtual("inscripciones",{
    ref:'Inscripcione',
    localField:"_id",
    foreignField: "proyecto",
},
{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
})
const ProjectModel = model("Proyecto", projectSchema);

export { ProjectModel };