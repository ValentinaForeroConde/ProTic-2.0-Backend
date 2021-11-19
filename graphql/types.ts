import { gql } from 'apollo-server-express';
import { tiposEnums } from '../models/enums/tipos';
import { tiposAvance } from '../models/avances/tipos';
import { tiposProyecto } from '../models/proyectos/tipos';
import { tiposUsuario } from '../models/usuarios/tipos';
import { tiposInscripcion } from '../models/inscripciones/tipos';

const tiposGlobal = gql`
scalar Date

`;

export  const tipos = [tiposGlobal, tiposEnums, tiposAvance, tiposProyecto, tiposUsuario, tiposInscripcion]