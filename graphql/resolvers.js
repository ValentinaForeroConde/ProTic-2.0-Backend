import { resolversAvance } from '../models/avances/resolvers.js';
import { resolversUsuarios } from '../models/usuarios/resolvers.js';
import { resolversProyecto } from '../models/proyectos/resolvers.js';
import { resolversInscripcion } from '../models/inscripciones/resolvers.js'


export const resolvers = [ resolversProyecto, resolversAvance, resolversUsuarios, resolversInscripcion];