import { UserModel } from "../models/user";
import {ProjectModel } from "../models/project"

const resolvers = {
    Query:{
        Usuarios: async (parent, args)=>{
            const usuarios = await UserModel.find();
            return usuarios;
        },
        Usuario: async (parent, args)=>{
            const usuario = await UserModel.findOne({_id:args._id});
            return usuario;
        },
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
            });
            return usuarioEditado;
        },

        eliminarUsuario: async(parent, args)=>{
            if(Object.keys(args).includes('_id')){
                const usuarioEliminado = await UserModel.findOneAndDelete({_id: args.id})
                return usuarioEliminado;
            }else if(Object.keys(args).includes('correo')){
                const usuarioEliminado = await UserModel.findOneAndDelete({correo: args.correo})
                return usuarioEliminado;
            }
        },

        crearProyecto: async (parent, args)=>{
            const proyectoCreado = await ProjectModel.create({
                nombre: args.nombre,
                presupuesto: args.presupuesto,
                fechaInicio: args.fechaInicio,
                fechaFin: args.fechaFin,
                estado: args.estado,
                fase: args.fase,
                lider: args.lider,
                objetivos: args.objetivos,
            });
            return proyectoCreado;
        }
    }
}

export { resolvers };