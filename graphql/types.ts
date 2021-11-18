import { gql } from 'apollo-server-express';

const typeDefs = gql`

scalar Date

enum Enum_EstadoUsuario{
    PENDIENTE
    AUTORIZADO
    NO_AUTORIZADO
}
enum Enum_Rol{
    ESTUDIANTE
    LIDER
    ADMINISTRADOR
}
enum Enum_EstadoProyecto{
    ACTIVO
    INACTIVO
}
enum Enum_FaseProyecto{
    INICIADO
    DESARROLLO
    TERMINADO
    NULA
}
enum Enum_TipoObjetivo{
    GENERAL
    ESPECIFICO
}

enum Enum_EstadoInscripcion{
    ACEPTADA
    RECHAZADA
}

type Usuario{
    _id: ID
    nombre: String!
    apellido: String!
    identificacion: String!
    correo: String!
    estado: Enum_EstadoUsuario!
    rol: Enum_Rol!
}

type Objetivo{
    _id:ID!
    descripcion: String!
    tipo: Enum_TipoObjetivo
}

input crearObjetivo{
    descripcion: String!
    tipo: Enum_TipoObjetivo
}


type Proyecto{
    _id: ID!
    nombre: String!
    presupuesto: Float!
    fechaInicio: Date!
    fechaFin: Date!
    estado: Enum_EstadoProyecto!
    fase: Enum_FaseProyecto!
    lider: Usuario!
    objetivos:[Objetivo]!
}

type Avance{
    _id: ID!
    proyecto: Proyecto!
    fecha: Date!
    descripcion: String!
    observaciones: [String!]
    creadoPor: Usuario!
}

type Query{
    Usuarios: [Usuario]
    Usuario(_id: String!): Usuario
    Proyectos: [Proyecto]
    Proyecto(_id: String!): Proyecto
    Avances:[Avance]
    filtrarAvance(idProyecto: String!): [Avance]
}
type Mutation{
    crearUsuarios(
        nombre:String!
        apellido: String!
        identificacion: String!
        correo: String!
        rol: Enum_Rol!
        estado: Enum_EstadoUsuario!
    ): Usuario

    editarUsuario(
        _id:String!
        nombre:String!
        apellido: String!
        identificacion: String!
        correo: String!
        rol: Enum_Rol!
        estado: Enum_EstadoUsuario!
    ): Usuario

    eliminarUsuario( _id: String! ): Usuario

    crearProyecto(
        nombre: String!
        presupuesto: Float!
        fechaInicio: Date!
        fechaFin: Date!
        estado: Enum_EstadoProyecto!
        fase: Enum_FaseProyecto!
        lider: String!
        objetivos: [crearObjetivo]!
    ):Proyecto

    editarProyecto(
        _id:String!
        nombre: String!
        presupuesto: Float!
        fechaInicio: Date!
        fechaFin: Date!
        estado: Enum_EstadoProyecto!
        fase: Enum_FaseProyecto!
        lider: String!
        objetivos: [crearObjetivo]
    ): Proyecto

    eliminarProyecto( _id: String! ): Proyecto

    crearAvance(
        proyecto: Proyecto!
        fecha: Date!
        descripcion: String!
        observaciones: [String!]
        creadoPor: Usuario!
    ):Avance

    editarAvance(
        _id:String!
        proyecto: Proyecto!
        fecha: Date!
        descripcion: String!
        observaciones: [String!]
        creadoPor: Usuario!
    ):Avance

    eliminarAvance( _id: String! ): Avance
}
`;

export  { typeDefs };