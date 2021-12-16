import { AdvancementModel } from "../avances/avance.js";
import { InscripcionModel } from "../inscripciones/inscripcion.js";

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      const avances = await AdvancementModel.find()
        .populate("proyecto")
        .populate("creadoPor");
      return avances;
    },
    filtrarAvance: async (parents, args) => {
      const avanceFiltrado = await AdvancementModel.find({ proyecto: args._id })
        .populate("proyecto")
        .populate("creadoPor");
      return avanceFiltrado;
    },
    Avance: async (parent, args) => {
      const avance = await AdvancementModel.findOne({ _id: args._id })
        .populate("proyecto")
        .populate("creadoPor");
      return avance;
    },
    FiltroEstudiante: async(parent, args, context) =>{
      const filtroEstudiante = await InscripcionModel.find({
        estudiante: context.userData._id,
        proyecto: args._id ,
        estado: "ACEPTADA",
        fechaEgreso: null,
      });
      return filtroEstudiante;
    },
  },
  Mutation: {
    crearAvance: async (parent, args, context) => {
      const filtrarInscripcion = await InscripcionModel.find({
        estudiante: context.userData._id,
        proyecto: args.proyecto,
        estado: "ACEPTADA",
        fechaEgreso: null,
      });
      console.log(filtrarInscripcion);
      if (filtrarInscripcion.length) {
        const avanceCreado = await AdvancementModel.create({
          proyecto: args.proyecto,
          fecha: Date.now(),
          descripcion: args.descripcion,
          creadoPor: args.creadoPor,
        });
        return avanceCreado;
      } else {
        return null;
      }
    },
    editarAvance: async (parent, args, context) => {
      const avanceEditado = await AdvancementModel.findByIdAndUpdate(
        args._id,
        {
          proyecto: args.proyecto,
          fecha: args.fecha,
          descripcion: args.descripcion,
          observaciones: args.observaciones,
          creadoPor: args.creadoPor,
        },
        { new: true }
      );
      return avanceEditado;
    },
    eliminarAvance: async (parent, args) => {
      const avanceEliminado = await AdvancementModel.findByIdAndDelete({
        _id: args._id,
      });
      return avanceEliminado;
    },
  },
};

export { resolversAvance };
