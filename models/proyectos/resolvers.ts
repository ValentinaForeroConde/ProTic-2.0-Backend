import { ProjectModel } from "../proyectos/proyecto"

const resolversProyecto = {
    Query:{
        Proyectos: async(parent, args)=>{
            const proyectos = await ProjectModel.find().populate('lider');
            return proyectos;
        },
        Proyecto: async(parent, args)=>{
            const proyecto = await (await ProjectModel.findOne({_id:args._id})).populate('lider');
            return proyecto;
        }
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
                objetivos:args.objetivos,
                lider:args.lider,
            });
            return proyectoCreado
        },
        editarProyecto: async(parent, args)=>{
            const proyectoEditado = await ProjectModel.findByIdAndUpdate(args._id,{
                nombre: args.nombre,
                presupuesto: args.presupuesto,
                fechaInicio: args.fechaInicio,
                fechaFin: args.fechaFin,
                estado: args.estado,
                fase: args.fase,
                lider: args.lider,
                objetivos: args.objetivos,
            });
            return proyectoEditado;
        },
        eliminarProyecto: async(parent,args)=>{
            const proyectoEliminado = await ProjectModel.findByIdAndDelete({_id: args._id});
            return proyectoEliminado;
        },

    }
}

export { resolversProyecto };