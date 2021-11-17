import {gql} from 'apollo-server-express';

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

type Usuario{
    _id: ID
    nombre: String!
    apellido: String!
    identificacion: String!
    correo: String!
    estado: Enum_EstadoUsuario!
    rol: Enum_Rol!
}

type Proyecto{
    _id: ID!
    nombre: String!
    presopuesto: float!
    fechaInicio: Date!
    fechaFin: Date!
    estado: Enum_EstadoProyecto!
    fase: Enum_FaseProyecto!
    lider: Usuario!
    objetivo:[
        {descripcion: String!, tipo:Enum_TipoObjetivo}
    ]
}

type Query{
    Usuarios: [Usuario]
    Usuario(_id: String!): Usuario
    Proyectos: [Proyecto]
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
    
}
`;

export  { typeDefs };