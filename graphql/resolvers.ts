import { resolversAvance } from '../models/avances/resolvers';
import { resolversUsuarios } from '../models/usuarios/resolvers';
import { resolversProyecto } from '../models/proyectos/resolvers';


export const resolvers = [ resolversProyecto, resolversAvance, resolversUsuarios];