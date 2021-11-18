import { AdvancementModel } from "../avances/avance";

const resolversAvance = {
    Query:{
        Avances: async(parent, args)=>{
            const avances = await AdvancementModel.find().populate('proyecto').populate('creadoPor');
            return avances;
        },
        filtrarAvance: async (parents, args) => {
            const avanceFiltrado = await AdvancementModel.find({ proyecto: args.idProyecto })
              .populate('proyecto')
              .populate('creadoPor');
            return avanceFiltrado;
        },
    },
    Mutation:{

        crearAvance: async (parent, args)=>{
            const avanceCreado = await AdvancementModel.create({
                proyecto: args.proyecto,
                fecha: args.fecha,
                descripcion: args.descripcion,
                observaciones: args.observaciones,
                creadoPor: args.creadoPor,
            });
            return avanceCreado
        },
        editarAvance: async(parent, args)=>{
            const avanceEditado = await AdvancementModel.findByIdAndUpdate(args._id,{
                proyecto: args.proyecto,
                fecha: args.fecha,
                descripcion: args.descripcion,
                observaciones: args.observaciones,
                creadoPor: args.creadoPor,
            });
            return avanceEditado;
        },
        eliminarAvance: async(parent,args)=>{
            const avanceEliminado = await AdvancementModel.findByIdAndDelete({_id: args._id});
            return avanceEliminado;
        },
    }
}

export { resolversAvance };