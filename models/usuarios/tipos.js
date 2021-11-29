import { gql } from 'apollo-server-express';

const tiposUsuario = gql`

scalar Date

type Usuario{
    _id: ID
    nombre: String!
    apellido: String!
    identificacion: String!
    correo: String!
    estado: Enum_EstadoUsuario
    rol: Enum_Rol
    inscripciones: [Inscripcion]
    avancesCreados: [Avance]
    proyectosLiderados: [Proyecto]
}

type Query{
    Usuarios: [Usuario]
    Usuario(_id: String!): Usuario
    Estudiantes:[Usuario]
}
type Mutation{
    crearUsuarios(
        nombre:String!
        apellido: String!
        identificacion: String!
        correo: String!
        rol: Enum_Rol!
        estado: Enum_EstadoUsuario
        password: String!
    ): Usuario

    editarUsuario(
        _id:String!
        nombre:String
        apellido: String
        identificacion: String
        correo: String
        rol: Enum_Rol
        estado: Enum_EstadoUsuario
    ): Usuario

    eliminarUsuario( _id: String! ): Usuario

}
`;

export  { tiposUsuario };