import { UserModel } from "./usuario.js";

const resolversUsuarios = {
    Query:{
        Usuarios: async (parent, args, context)=>{
            // if (context.userData.rol === 'ADMINISTRADOR'){
            //     const usuarios = await UserModel.find();
            //     return usuarios;
            // }
            // else if (context.userData.rol === 'LIDER'){
            //     const usuarios = await UserModel.find({rol:'ESTUDIANTE'});
            //     return usuarios;
            // }
            // else{
            //     return null;
            // }
            const usuarios = await UserModel.find().populate('avancesCreados').populate([
                {
                    path:"inscripciones",
                    populate:{
                        path:"proyecto",
                        // populate: {
                        //     path:"lider"
                        // }
                    },
                },
            ]);
            return usuarios;
        },
        Usuario: async (parent, args)=>{
            const usuario = await UserModel.findOne({_id:args._id});
            return usuario;
        },

        Estudiantes: async (parent, args)=>{
            const estudiantes = await UserModel.find({rol:'ESTUDIANTE'});
            return estudiantes;
        },

    },
    Mutation:{
        crearUsuarios: async (parent, args)=>{
            const usuarioCreado = await UserModel.create({
                nombre: args.nombre,
                apellido: args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                estado: args.estado,
                rol: args.rol,
            });
            if(Object.keys(args).includes('estado')){
                usuarioCreado.estado = args.estado;
            }
            return usuarioCreado;
        },
        editarUsuario: async(parent, args)=>{
            const usuarioEditado = await UserModel.findByIdAndUpdate(args._id,{
                nombre: args.nombre,
                apellido: args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                estado: args.estado,
                rol: args.rol,
            },{new: true});
            return usuarioEditado;
        },
        eliminarUsuario: async(parent,args)=>{
            const usuarioEliminado = await UserModel.findByIdAndDelete({_id: args._id});
            return usuarioEliminado;
        },
    }
}

export { resolversUsuarios };