import { gql } from 'apollo-server-express';

const tiposInscripcion  = gql`

scalar Date

type Inscripcion{
    _id: ID!
    proyecto: Proyecto!
    fechaIngreso: Date!
    fechaEgreso: Date
    estado: Enum_EstadoInscripcion!
    estudiante: Usuario!
}

type Query{
    Inscripciones:[Inscripcion]
    filtrarInscripcion(idProyecto: String!): [Inscripcion]
}
type Mutation{
    crearInscripcion(
        proyecto: String!
        fechaIngreso: Date!
        fechaEgreso: Date
        estado: String!
        estudiante: String!
    ):Inscripcion

    editarInscripcion(
        _id:String!
        proyecto: String!
        fechaIngreso: Date!
        fechaEgreso: Date
        estado: String!
        estudiante: String!
    ):Inscripcion
    
    aprobarInscripcion( _id: String! ): Inscripcion
    
    eliminarInscripcion( _id: String! ): Inscripcion
}
`;

export  { tiposInscripcion };