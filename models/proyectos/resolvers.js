import { ProjectModel } from "./proyecto.js"
import { InscripcionModel } from "../inscripciones/inscripcion.js"

const resolversProyecto = {
    Query:{
        Proyectos: async(parent, args, context)=>{
            const proyectos = await ProjectModel.find().populate('lider').populate('avances').populate('inscripciones');
            return proyectos;
        },
        Proyecto: async(parent, args)=>{
            const proyecto =  await ProjectModel.findOne({_id:args._id}).populate('lider');
            return proyecto;
        },
        MisProyectos : async(parent, args, context)=>{
            if (context.userData.rol === 'LIDER'){
                    const misProyectos = await ProjectModel.find({ lider: context.userData._id }).populate('avances').populate('inscripciones').populate('lider')
                    return misProyectos;
                }
            else if (context.userData.rol === 'ESTUDIANTE'){
                let filtro = {};
                const inscripciones = await InscripcionModel.find({ estudiante:context.userData._id });
                const inscripList = inscripciones.map((p) => p.proyecto.toString());
                filtro = {
                    _id: {$in: inscripList},
                    };
                const misProyectos = await ProjectModel.find({ ...filtro }).populate('inscripciones');
                return misProyectos;

                }
            else{
                return null;
            }
        },
    },
    Mutation:{
        crearProyecto: async (parent, args)=>{
            const proyectoCreado = await ProjectModel.create({
                nombre:args.nombre,
                estado:args.estado,
                fase:args.fase,
                fechaInicio:args.fechaInicio,
                fechaFin:args.fechaFin,
                presupuesto:args.presupuesto,
                objetivoGeneral:args.objetivoGeneral,
                objetivos:args.objetivos,
                lider:args.lider,
            });
            return proyectoCreado
        },
        editarProyecto: async(parent, args)=>{
            const proyectoEditado = await ProjectModel.findByIdAndUpdate(args._id,{
                nombre:args.nombre,
                estado:args.estado,
                fase:args.fase,
                fechaInicio:args.fechaInicio,
                fechaFin:args.fechaFin,
                presupuesto:args.presupuesto,
                objetivos:args.objetivos,
                lider:args.lider
            },{new: true});
            return proyectoEditado;
        },
        eliminarProyecto: async(parent,args)=>{
            const proyectoEliminado = await ProjectModel.findByIdAndDelete({_id: args._id});
            return proyectoEliminado;
        },
    }
}

export { resolversProyecto };