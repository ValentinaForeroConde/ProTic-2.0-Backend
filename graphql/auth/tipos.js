import { gql } from 'apollo-server-express';

const tiposAutentificacion = gql`

    type Token{
        token:String
        error:String
    }

    type Mutation{
        registro(
            nombre:String!
            apellido: String!
            identificacion: String!
            correo: String!
            rol: Enum_Rol!
            password: String!
        ): Token!
    }
`;


export  { tiposAutentificacion };