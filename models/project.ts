import {Schema, model} from 'mongoose';
import { Enum_EstadoProyecto, Enum_FaseProyecto } from './enums';
import { UserModel } from './user';
import { ObjectiveModel } from './objective';

interface Proyecto{
    nombre: string,
    presupuesto: number,
    fechaInicio: Date,
    fechaFin: Date,
    estado: Enum_EstadoProyecto,
    fase: Enum_FaseProyecto,
    lider: Schema.Types.ObjectId,
    objetivos:[Schema.Types.ObjectId]
}

const projectSchema = new Schema<Proyecto>({
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
        enum: Enum_EstadoProyecto, 
        default: Enum_EstadoProyecto.inactivo,
    },
    fase: {
        type:String,
        enum: Enum_FaseProyecto,
        default: Enum_FaseProyecto.nula,
    },
    lider: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: UserModel,
    },
    objetivos: [
        {
            type: Schema.Types.ObjectId,
            ref: ObjectiveModel,
        }
    ]
});

const ProjectModel = model("Proyecto", projectSchema);

export { ProjectModel };