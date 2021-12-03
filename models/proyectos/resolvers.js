import { ProjectModel } from "./proyecto.js"

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
                    const misProyectos = await ProjectModel.find({_id:args._id}).populate('lider').populate('avances').populate('inscripciones');
                    return misProyectos;
                }
                else if (context.userData.rol === 'ESTUDIANTE'){
                    const misProyectos = await ProjectModel.find().populate('lider').populate('avances').populate([
                        {
                            path:"inscripciones",
                            match: { _id: { $in: context.userData._id }}
                        },
                    ]);
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

        crearObjetivo: async(parent,args)=>{
            const proyectoConObjetivo = await ProjectModel.findByIdAndUpdate(args.idProyecto,{
                $addToSet:{
                    objetivos: { ...args.campos },
                },
            },{new: true});
            return proyectoConObjetivo;
        },
        editarObjetivo: async (parent, args) => {
            const proyectoEditado = await ProjectModel.findByIdAndUpdate(
              args.idProyecto,
              {
                $set: {
                  [`objetivos.${args.indexObjetivo}.descripcion`]: args.campos.descripcion,
                  [`objetivos.${args.indexObjetivo}.tipo`]: args.campos.tipo,
                },
              },
              { new: true }
            );
            return proyectoEditado;
        },
        eliminarObjetivo: async (parent, args) => {
            const proyectoObjetivo = await ProjectModel.findByIdAndUpdate(
              { _id: args.idProyecto },
              {
                $pull: {
                  objetivos: {
                    _id: args.idObjetivo,
                  },
                },
              },
              { new: true }
            );
            return proyectoObjetivo;
        },
    }
}

export { resolversProyecto };