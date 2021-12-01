import { gql } from 'apollo-server-express';

const tiposProyecto = gql`

type Objetivo{
    _id:ID!
    descripcion: String!
    tipo: Enum_TipoObjetivo
}
input crearObjetivo{
    descripcion: String!
    tipo: Enum_TipoObjetivo
}

input camposObjetivo {
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }

type Proyecto{
    _id: ID!
    nombre: String!
    presupuesto: String!
    fechaInicio: Date!
    fechaFin: Date!
    estado: Enum_EstadoProyecto!
    fase: Enum_FaseProyecto!
    lider: Usuario!
    objetivos:[Objetivo]!
    avances: [Avance]
    inscripciones: [Inscripcion]
}

type Query{
    Proyectos: [Proyecto]
    Proyecto(_id: String!): Proyecto
}
type Mutation{
    crearProyecto(
        nombre: String!
        presupuesto: String!
        fechaInicio: Date!
        fechaFin: Date!
        estado: Enum_EstadoProyecto
        fase: Enum_FaseProyecto
        lider: String!
        objetivos: [crearObjetivo]
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
    ): Proyecto

    eliminarProyecto( _id: String! ): Proyecto

    crearObjetivo(
        idProyecto: String!,
        campos:camposObjetivo!
    ): Proyecto

    editarObjetivo(
        idProyecto: String!,
        indexObjetivo: Int!,
        campos: camposObjetivo!
        ): Proyecto

    eliminarObjetivo(
        idProyecto: String!,
        idObjetivo: String!
        ): Proyecto
}
`;

export  { tiposProyecto };