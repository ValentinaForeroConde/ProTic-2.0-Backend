import { resolversAvance } from '../models/avances/resolvers';
import { resolversUsuarios } from '../models/usuarios/resolvers';
import { resolversProyecto } from '../models/proyectos/resolvers';
import { resolversInscripcion } from '../models/inscripciones/resolvers'


export const resolvers = [ resolversProyecto, resolversAvance, resolversUsuarios, resolversInscripcion];