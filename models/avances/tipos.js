import { gql } from "apollo-server-express";

const tiposAvance = gql`
  scalar Date

  type Avance {
    _id: ID!
    proyecto: Proyecto
    fecha: Date
    descripcion: String
    observaciones: String
    creadoPor: Usuario
}

type Query{
    Avances:[Avance]
    filtrarAvance(_id: String!): [Avance]
    Avance(_id: String!): Avance
}
type Mutation{
    crearAvance(
        proyecto: String!
        fecha: Date
        descripcion: String!
        creadoPor: String!
    ):Avance

    editarAvance(
        _id:String!
        proyecto: String
        fecha: Date
        descripcion: String
        observaciones:String
        creadoPor: String
    ):Avance

    eliminarAvance( _id: String! ): Avance
}
`;

export { tiposAvance };
