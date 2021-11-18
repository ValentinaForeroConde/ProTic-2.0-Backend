import  conectarBD from './db/db';
import { UserModel } from './models/usuarios/usuario';
import { Enum_Rol, Enum_TipoObjetivo } from './models/enums/enums';
import { ProjectModel } from './models/proyectos/proyecto'
import {ObjectiveModel } from './models/objetivos/objetivo'

const main = async () =>{
    await conectarBD();

    // const objet = await ObjectiveModel.create({
    //     descripcion: 'este es un objetivo especifico',
    //     tipo: Enum_TipoObjetivo.especifico,
    // })
    // ProjectModel.create({
    //     nombre: "Proyecto 3",
    //     presupuesto: 120,
    //     fechaInicio: Date.now(),
    //     fechaFin: new Date("2022/11/10"),
    //     lider: '618c48f87da55ad985c0b86a',
    //     objetivos:['618d86a4f489e3c24547be7f','618d86fa3a979f76508dfdb0']
    // })

    // const proyecto = await projectModel.find({nombre: 'Proyecto 2'}).populate('lider');
    // console.log('el proyecto es: ', proyecto);

    
   
};

main();

//CRUD USUARIO
 // //CREAR UN USUARIO
    // await UserModel.create({
    //     apellido:"Saldarriaga",
    //     correo:"dcg@.com",
    //     identificacion:"123",
    //     nombre:"daniel",
    //     rol: Enum_Rol.administrador,

    // })
    // .then((u) =>{
    //     console.log('usuario creado', u);
    // })
    // .catch((e) =>{
    //     console.log('error creando usuario', e);
    // });

    // OBTENER LOS USUARIOS
    // await UserModel.find().then((u) =>{
    //     console.log('usuarios', u);
    // })
    // .then((u) =>{
    //     console.log('usuario creado', u);
    // })
    // .catch((e) =>{
    //     console.log('error creando usuario', e);
    // });

    //EDITAR UN USUARIO
    // await UserModel.findOneAndUpdate(
    // {correo : 'dcg@.com'},
    // {
    //     nombre: "Carlos",

    // }).then((u)=>{
    //     console.log('usuario actualizado', u);
    // }).catch(e=>{
    //     console.log('error creando usuario', e);
    // })
     //ELIMINAR UN USUARIO
    //  await UserModel.findOneAndDelete(
    //         {correo : 'dcg@.com'}
    //     ).then(u=>{
    //         console.log('usuario eliminado', u);
    //     }).catch(e=>{
    //         console.log('error eliminando usuario', e);
    //     })
     //OBTENER UN SOLO USUARIO
    //  await UserModel.findOne(
    //     {identificacion: '456464'}
    // ).then(u=>{
    //     console.log('usuario encontrado', u);
    // }).catch(e=>{
    //     console.log('error encontrando usuario', e);
    // })    