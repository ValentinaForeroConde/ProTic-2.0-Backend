import { InscripcionModel } from "./inscripcion.js";

const resolversInscripcion = {
    Query:{
        Inscripciones: async(parent, args)=>{
            const avances = await InscripcionModel.find().populate('proyecto').populate('estudiante');
            return avances;
        },
        filtrarInscripcion: async (parents, args) => {
            const inscripcionFiltrada = await InscripcionModel.find({ proyecto: args.idProyecto })
              .populate('proyecto')
              .populate('estudiante');
            return inscripcionFiltrada;
        },
    },
    Mutation:{
        crearInscripcion: async (parent, args)=>{
            const inscripcionCreada = await InscripcionModel.create({
                proyecto: args.proyecto,
                fechaIngreso: args.fechaIngreso,
                fechaEgreso: args.fechaEgreso,
                estado: args.estado,
                estudiante: args.estudiante,
            });
            return inscripcionCreada
        },
        editarInscripcion: async(parent, args)=>{
            const inscripcionEditada = await InscripcionModel.findByIdAndUpdate(args._id,{
                proyecto: args.proyecto,
                fechaIngreso: args.fechaIngreso,
                fechaEgreso: args.fechaEgreso,
                estado: args.estado,
                estudiante: args.estudiante,
            },{new: true});
            return inscripcionEditada;
        },
        aprobarInscripcion: async(parent,args)=>{
            const inscripcionAprobada = await InscripcionModel.findByIdAndUpdate(args._id,{
                estado: "ACEPTADO",
                fechaIngreso: Date.now(),
            },{new: true});
            return inscripcionAprobada;
        },
        eliminarInscripcion: async(parent,args)=>{
            const inscripcionEliminada = await InscripcionModel.findByIdAndDelete({_id: args._id});
            return inscripcionEliminada;
        },
    }
}

export { resolversInscripcion };