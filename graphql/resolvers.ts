import { resolversProyecto } from '../models/proyectos/resolvers';
import { resolversAvance } from '../models/avances/resolvers';
import { resolversUsuarios } from '../models/usuarios/resolvers';

export const resolvers = [resolversProyecto, resolversAvance, resolversUsuarios];