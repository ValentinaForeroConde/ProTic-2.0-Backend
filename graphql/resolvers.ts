import { UserModel } from "../models/user";
import {ProjectModel } from "../models/project"
import { AdvancementModel } from "../models/avances";

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
        },
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
        eliminarUsuario: async(parent,args)=>{
            const usuarioEliminado = await UserModel.findByIdAndDelete({_id: args._id});
            return usuarioEliminado;
        },

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

export { resolvers };