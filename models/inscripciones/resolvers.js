import { InscripcionModel } from "./inscripcion.js";

const resolversInscripcion = {
  Query: {
    Inscripciones: async (parent, args) => {
      const Inscripciones = await InscripcionModel.find()
        .populate("proyecto")
        .populate("estudiante");
      return Inscripciones;
    },
    filtrarInscripcion: async (parents, args) => {
      const inscripcionFiltrada = await InscripcionModel.find({
        proyecto: args.idProyecto,
      })
        .populate("proyecto")
        .populate("estudiante");
      return inscripcionFiltrada;
    },
    filtrarEstudiate: async (parents, args) => {
      const inscripcionEstudiante = await InscripcionModel.find({
        estudiante: args.estudiante,
      })
        .populate("proyecto")
        .populate("estudiante");
      return inscripcionEstudiante;
    },
    Inscripcion: async (parent, args) => {
      const Inscripcion = await InscripcionModel.findOne({ _id: args._id })
        .populate("proyecto")
        .populate("estudiante");
      return Inscripcion;
    },
  },
  Mutation: {
    crearInscripcion: async (parent, args) => {
      const filtrarInscripcion = await InscripcionModel.find({
        estudiante: args.estudiante,
        proyecto: args.proyecto,
        estado: "PENDIENTE",
      });
      const filtrarInscripcio = await InscripcionModel.find({
        estudiante: args.estudiante,
        proyecto: args.proyecto,
        estado: "ACEPTADA",
        fechaEgreso: null,
      });
      const filtrofecha = await InscripcionModel.find({
        estudiante: args.estudiante,
        proyecto: args.proyecto,
        fechaEgreso: { $ne: null },
      });
      if (filtrarInscripcion.length || filtrarInscripcio.length) {
        return null;
      } else if (filtrofecha.length) {
        const inscripcionCreada = await InscripcionModel.create({
          proyecto: args.proyecto,
          estado: args.estado,
          estudiante: args.estudiante,
        });
        return inscripcionCreada;
      } else if (filtrofecha.length > 0) {
        return null;
      } else {
        console.log("yeah");
        const inscripcionCreada = await InscripcionModel.create({
          proyecto: args.proyecto,
          estado: args.estado,
          estudiante: args.estudiante,
        });
        return inscripcionCreada;
      }
    },

    editarInscripcion: async (parent, args) => {
      if (args.estado === "ACEPTADA") {
        const inscripcionEditada = await InscripcionModel.findByIdAndUpdate(
          args._id,
          {
            proyecto: args.proyecto,
            fechaIngreso: Date.now(),
            fechaEgreso: args.fechaEgreso,
            estado: args.estado,
            estudiante: args.estudiante,
          },
          { new: true }
        );
        return inscripcionEditada;
      } else {
        const inscripcionEditada = await InscripcionModel.findByIdAndUpdate(
          args._id,
          {
            proyecto: args.proyecto,
            estado: args.estado,
            estudiante: args.estudiante,
          },
          { new: true }
        );
        return inscripcionEditada;
      }
    },
    fechaEgreso: async (parent, args) => {
      // const Inscripciones = await InscripcionModel.find({estado:"ACEPTADA"});
      // console.log(Inscripciones);
      // console.log("MODEL"+InscripcionModel);
      const fechaDeEgreso = await InscripcionModel.updateMany(
        { proyecto: args.idProyecto, estado: "ACEPTADA", fechaEgreso: null },
        {
          fechaEgreso: Date.now(),
        },
        { new: true }
      );
      console.log(fechaDeEgreso);
      const inscripcionFiltrada = await InscripcionModel.find({
        proyecto: args.idProyecto,
      });
      return inscripcionFiltrada;
    },
    aprobarInscripcion: async (parent, args) => {
      const inscripcionAprobada = await InscripcionModel.findByIdAndUpdate(
        args._id,
        {
          estado: "ACEPTADO",
          fechaIngreso: Date.now(),
        },
        { new: true }
      );
      return inscripcionAprobada;
    },
    eliminarInscripcion: async (parent, args) => {
      const inscripcionEliminada = await InscripcionModel.findByIdAndDelete({
        _id: args._id,
      });
      return inscripcionEliminada;
    },
  },
};

export { resolversInscripcion };
