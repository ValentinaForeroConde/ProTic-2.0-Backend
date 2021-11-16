enum Enum_Rol{
    estudiante = 'Estudiante',
    lider = 'Lider',
    administrador = 'Administrador',
};

enum Enum_EstadoUsuario{
    pendiente = 'Pendiente',
    autorizado = 'Autorizado',
    no_autorizado = 'No Autorizado',
};

enum Enum_EstadoProyecto{
    activo = 'Activo',
    inactivo = 'Inactivo',
};

enum Enum_FaseProyecto{
    iniciado = 'Iniciado',
    desarrollo = 'Desarrollo',
    terminado = 'Terminado',
    nula ='' ,
};

enum Enum_TipoObjetivo{
    general = 'General',
    especifico = 'Específico',
};
export { Enum_Rol, Enum_EstadoUsuario, Enum_EstadoProyecto, Enum_FaseProyecto, Enum_TipoObjetivo};