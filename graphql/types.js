import { gql } from 'apollo-server-express';
import { tiposEnums } from '../models/enums/tipos.js';
import { tiposAvance } from '../models/avances/tipos.js';
import { tiposProyecto } from '../models/proyectos/tipos.js';
import { tiposUsuario } from '../models/usuarios/tipos.js';
import { tiposInscripcion } from '../models/inscripciones/tipos.js';

const tiposGlobal = gql`
scalar Date

`;

export  const tipos = [tiposGlobal, tiposEnums, tiposAvance, tiposProyecto, tiposUsuario, tiposInscripcion]