import { InscripcionModel } from "./inscripcion.js";

const resolversInscripcion = {
    Query:{
        Inscripciones: async(parent, args)=>{
            const Inscripciones = await InscripcionModel.find().populate('proyecto').populate('estudiante');
            return Inscripciones;
        },
        filtrarInscripcion: async (parents, args) => {
            const inscripcionFiltrada = await InscripcionModel.find({ proyecto: args.idProyecto })
              .populate('proyecto')
              .populate('estudiante');
            return inscripcionFiltrada;
        },
        filtrarEstudiate: async (parents, args) => {
            const inscripcionEstudiante = await InscripcionModel.find({ estudiante: args.estudiante })
              .populate('proyecto')
              .populate('estudiante');
            return inscripcionEstudiante;
        },
        Inscripcion: async(parent, args)=>{
            const Inscripcion = await InscripcionModel.findOne({_id: args._id}).populate('proyecto').populate('estudiante');
            return Inscripcion;
        },
    },
    Mutation:{
        crearInscripcion: async (parent, args)=>{
            const inscripcionCreada = await InscripcionModel.create({
                proyecto: args.proyecto,
                estado: args.estado,
                estudiante: args.estudiante,
            });
            return inscripcionCreada
        },
        editarInscripcion: async(parent, args)=>{
            if(args.estado === 'ACEPTADA'){
                const inscripcionEditada = await InscripcionModel.findByIdAndUpdate(args._id,{
                    proyecto: args.proyecto,
                    fechaIngreso: Date.now(),
                    fechaEgreso: args.fechaEgreso,
                    estado: args.estado,
                    estudiante: args.estudiante,
                },{new: true});
                return inscripcionEditada;
            }else{
                const inscripcionEditada = await InscripcionModel.findByIdAndUpdate(args._id,{
                    proyecto: args.proyecto,
                    estado: args.estado,
                    estudiante: args.estudiante,
                },{new: true});
                return inscripcionEditada;
            }
        },
        fechaEgreso: async (parent, args)=>{
            // const fechaDeEgreso = await InscripcionModel.find({proyecto: args.idProyecto },{
            const fechaDeEgreso = await InscripcionModel.updateMany({proyecto: args.idProyecto },{
                fechaEgreso: Date.now(),
            },{new: true});
            const inscripcionFiltrada = await InscripcionModel.find({ proyecto: args.idProyecto })
            return inscripcionFiltrada;
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