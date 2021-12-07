import { gql } from 'apollo-server-express';

const tiposProyecto = gql`

type Objetivo{
    descripcion: String!
}
input crearObjetivo{
    descripcion: String!
}
type Proyecto{
    _id: ID!
    nombre: String!
    presupuesto: String!
    fechaInicio: Date!
    fechaFin: Date
    estado: Enum_EstadoProyecto!
    fase: Enum_FaseProyecto!
    lider: Usuario!
    objetivoGeneral:String!
    objetivos:[Objetivo]!
    avances: [Avance]
    inscripciones: [Inscripcion]
}

type Query{
    Proyectos: [Proyecto]
    Proyecto(_id: String!): Proyecto
    MisProyectos:[Proyecto]
}
type Mutation{
    crearProyecto(
        nombre: String!
        presupuesto: String!
        fechaInicio: Date!
        fechaFin: Date
        estado: Enum_EstadoProyecto
        fase: Enum_FaseProyecto
        lider: String!
        objetivoGeneral:String!
        objetivos: [crearObjetivo]!
    ):Proyecto

    editarProyecto(
        _id:String!
        nombre: String
        presupuesto: String
        fechaInicio: Date
        fechaFin: Date
        estado: Enum_EstadoProyecto
        fase: Enum_FaseProyecto
        lider: String
        objetivoGeneral:String
        objetivos: [crearObjetivo]
    ): Proyecto

    eliminarProyecto( _id: String! ): Proyecto

}
`;

export  { tiposProyecto };